const { Component, ComponentLog, User } = require('../models');

const seedSampleData = async () => {
  try {
    console.log('🌱 Seeding sample data...');

    // Create a test user if it doesn't exist
    let testUser = await User.findOne({ where: { username: 'testuser' } });
    if (!testUser) {
      testUser = await User.create({
        username: 'testuser',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'User'
      });
      console.log('✅ Created test user');
    }

    // Create sample components if they don't exist
    const sampleComponents = [
      {
        name: 'Arduino Uno',
        manufacturer: 'Arduino',
        partNumber: 'A000066',
        description: 'Microcontroller board based on ATmega328P',
        quantity: 15,
        location: 'Shelf A1',
        unitPrice: 22.00,
        category: 'Microcontrollers',
        criticalThreshold: 5
      },
      {
        name: 'Raspberry Pi 4 Model B',
        manufacturer: 'Raspberry Pi Foundation',
        partNumber: 'RPI4-MODBP-4GB',
        description: 'Single-board computer with 4GB RAM',
        quantity: 8,
        location: 'Shelf B2',
        unitPrice: 55.00,
        category: 'Single Board Computers',
        criticalThreshold: 10
      },
      {
        name: 'LED Strip WS2812B',
        manufacturer: 'Worldsemi',
        partNumber: 'WS2812B-5M',
        description: '5-meter RGB LED strip with 300 LEDs',
        quantity: 3,
        location: 'Shelf C3',
        unitPrice: 18.50,
        category: 'LEDs',
        criticalThreshold: 5
      },
      {
        name: 'ESP32 Development Board',
        manufacturer: 'Espressif',
        partNumber: 'ESP32-DEVKIT',
        description: 'WiFi and Bluetooth enabled microcontroller',
        quantity: 2,
        location: 'Shelf A2',
        unitPrice: 12.00,
        category: 'Microcontrollers',
        criticalThreshold: 3
      },
      {
        name: 'Breadboard 830 Points',
        manufacturer: 'Generic',
        partNumber: 'BB-830',
        description: 'Solderless breadboard for prototyping',
        quantity: 1,
        location: 'Shelf B3',
        unitPrice: 8.50,
        category: 'Prototyping',
        criticalThreshold: 2
      },
      {
        name: 'Jumper Wires Set',
        manufacturer: 'Generic',
        partNumber: 'JW-40M',
        description: '40-piece male-to-male jumper wire set',
        quantity: 0,
        location: 'Shelf C1',
        unitPrice: 5.00,
        category: 'Connectors',
        criticalThreshold: 1
      }
    ];

    for (const componentData of sampleComponents) {
      let component = await Component.findOne({ where: { name: componentData.name } });
      if (!component) {
        component = await Component.create(componentData);
        console.log(`✅ Created component: ${component.name} (Qty: ${component.quantity}, Threshold: ${component.criticalThreshold})`);
      } else {
        // Update existing component quantities and thresholds to ensure we have low stock items
        await component.update({ 
          quantity: componentData.quantity,
          criticalThreshold: componentData.criticalThreshold
        });
        console.log(`✅ Updated component: ${component.name} (Qty: ${componentData.quantity}, Threshold: ${componentData.criticalThreshold})`);
      }
    }

    // Create sample logs
    const components = await Component.findAll();
    const users = await User.findAll();

    if (components.length > 0 && users.length > 0) {
      const sampleLogs = [
        {
          componentId: components[0].id,
          userId: users[0].id,
          changeType: 'inward',
          quantity: 10,
          reason: 'Initial stock',
          project: 'General Inventory'
        },
        {
          componentId: components[0].id,
          userId: users[0].id,
          changeType: 'outward',
          quantity: 3,
          reason: 'Project: Smart Home System',
          project: 'Smart Home'
        },
        {
          componentId: components[1].id,
          userId: users[0].id,
          changeType: 'inward',
          quantity: 5,
          reason: 'Restock',
          project: 'General Inventory'
        },
        {
          componentId: components[2].id,
          userId: users[0].id,
          changeType: 'inward',
          quantity: 2,
          reason: 'New project requirement',
          project: 'LED Art Installation'
        },
        {
          componentId: components[0].id,
          userId: users[0].id,
          changeType: 'inward',
          quantity: 8,
          reason: 'Replenishment',
          project: 'General Inventory'
        }
      ];

      for (const logData of sampleLogs) {
        await ComponentLog.create(logData);
      }
      console.log(`✅ Created ${sampleLogs.length} sample logs`);
    }

    console.log('🎉 Sample data seeding completed!');
    
    // Log current low stock items
    const lowStockItems = await Component.findAll({
      where: {
        quantity: {
          [require('sequelize').Op.lte]: require('sequelize').col('criticalThreshold')
        }
      }
    });
    console.log(`📊 Current low stock items: ${lowStockItems.length}`);
    lowStockItems.forEach(item => {
      console.log(`   - ${item.name}: ${item.quantity}/${item.criticalThreshold} units`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding sample data:', error);
  }
};

module.exports = { seedSampleData };
