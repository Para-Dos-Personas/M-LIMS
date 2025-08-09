// services/notificationService.js
const { Notification, Component, ComponentLog, User } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/db');

class NotificationService {
  
  /**
   * Check for low stock components and create notifications
   */
  async checkLowStock() {
    try {
      console.log('Checking for low stock components...');
      
      const lowStockComponents = await Component.findAll({
        where: {
          quantity: {
            [Op.lte]: sequelize.col('criticalThreshold')
          }
        },
        order: [['quantity', 'ASC']]
      });

      console.log(`Found ${lowStockComponents.length} low stock components`);

      for (const component of lowStockComponents) {
        // Check if we already have a recent notification for this component
        const existingNotification = await Notification.findOne({
          where: {
            type: 'low_stock',
            componentId: component.id,
            isRead: false,
            createdAt: {
              [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
            }
          }
        });

        if (!existingNotification) {
          const severity = this.getLowStockSeverity(component.quantity, component.criticalThreshold);
          
          await Notification.create({
            type: 'low_stock',
            title: `Low Stock Alert: ${component.name}`,
            message: `Component "${component.name}" is running low. Current quantity: ${component.quantity}, Critical threshold: ${component.criticalThreshold}. Location: ${component.location}`,
            componentId: component.id,
            userId: null, // For all users
            severity: severity,
            metadata: {
              currentQuantity: component.quantity,
              criticalThreshold: component.criticalThreshold,
              location: component.location,
              partNumber: component.partNumber
            }
          });

          console.log(`Created low stock notification for ${component.name}`);
        }
      }
    } catch (error) {
      console.error('Error checking low stock:', error);
    }
  }

  /**
   * Check for old stock components (no outward movement for >3 months)
   */
  async checkOldStock() {
    try {
      console.log('Checking for old stock components...');
      
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      // Find components that haven't had any outward movement in 3+ months
      const allComponents = await Component.findAll({
        include: [{
          model: ComponentLog,
          as: 'logs',
          where: {
            changeType: 'outward',
            createdAt: {
              [Op.gte]: threeMonthsAgo
            }
          },
          required: false
        }]
      });

      const oldStockComponents = allComponents.filter(component => 
        component.logs.length === 0 && component.createdAt < threeMonthsAgo
      );

      console.log(`Found ${oldStockComponents.length} old stock components`);

      for (const component of oldStockComponents) {
        // Check if we already have a recent notification for this component
        const existingNotification = await Notification.findOne({
          where: {
            type: 'old_stock',
            componentId: component.id,
            isRead: false,
            createdAt: {
              [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
            }
          }
        });

        if (!existingNotification) {
          const daysSinceAdded = Math.floor((new Date() - component.createdAt) / (1000 * 60 * 60 * 24));
          
          await Notification.create({
            type: 'old_stock',
            title: `Old Stock Alert: ${component.name}`,
            message: `Component "${component.name}" has been in inventory for ${daysSinceAdded} days without any outward movement. Consider reviewing or relocating. Location: ${component.location}`,
            componentId: component.id,
            userId: null, // For all users
            severity: daysSinceAdded > 180 ? 'high' : 'medium', // 6+ months = high severity
            metadata: {
              daysSinceAdded: daysSinceAdded,
              quantity: component.quantity,
              location: component.location,
              partNumber: component.partNumber
            }
          });

          console.log(`Created old stock notification for ${component.name}`);
        }
      }
    } catch (error) {
      console.error('Error checking old stock:', error);
    }
  }

  /**
   * Get all notifications for a user
   */
  async getNotifications(userId = null, options = {}) {
    const {
      page = 1,
      limit = 20,
      unreadOnly = false,
      type = null
    } = options;

    const whereClause = {
      [Op.or]: [
        { userId: userId },
        { userId: null } // Global notifications
      ]
    };

    if (unreadOnly) {
      whereClause.isRead = false;
    }

    if (type) {
      whereClause.type = type;
    }

    const notifications = await Notification.findAndCountAll({
      where: whereClause,
      include: [{
        model: Component,
        as: 'Component',
        attributes: ['id', 'name', 'partNumber', 'location']
      }],
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: (page - 1) * limit
    });

    return {
      notifications: notifications.rows,
      totalCount: notifications.count,
      page: page,
      totalPages: Math.ceil(notifications.count / limit),
      hasUnread: notifications.rows.some(n => !n.isRead)
    };
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId, userId = null) {
    const whereClause = { id: notificationId };
    
    if (userId) {
      whereClause[Op.or] = [
        { userId: userId },
        { userId: null }
      ];
    }

    const result = await Notification.update(
      { isRead: true },
      { where: whereClause }
    );

    return result[0] > 0;
  }

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId = null) {
    const whereClause = {
      [Op.or]: [
        { userId: userId },
        { userId: null }
      ],
      isRead: false
    };

    const result = await Notification.update(
      { isRead: true },
      { where: whereClause }
    );

    return result[0];
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(userId = null) {
    const count = await Notification.count({
      where: {
        [Op.or]: [
          { userId: userId },
          { userId: null }
        ],
        isRead: false
      }
    });

    return count;
  }

  /**
   * Determine severity based on stock level
   */
  getLowStockSeverity(quantity, threshold) {
    if (quantity === 0) return 'critical';
    if (quantity <= Math.min(3, threshold * 0.3)) return 'high';
    if (quantity <= threshold * 0.5) return 'medium';
    return 'low';
  }

  /**
   * Run all notification checks
   */
  async runAllChecks() {
    console.log('Running notification checks...');
    await this.checkLowStock();
    await this.checkOldStock();
    console.log('Notification checks completed');
  }
}

module.exports = new NotificationService();
