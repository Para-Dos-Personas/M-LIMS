const { Component, ComponentLog, User } = require('../models');

const seedSampleData = async () => {
  try {
    console.log('Seeding sample data...');

    // Create admin user if it doesn't exist
    let adminUser = await User.findOne({ where: { username: 'admin' } });
    if (!adminUser) {
      adminUser = await User.create({
        username: 'admin',
        password: '$2b$10$CwTycUXWue0Thq9StjUM0uJ8Z8W9SWvWrCOMWc8tRG4VSyPUa5J1i', // admin123
        role: 'Admin'
      });
      console.log('Created admin user');
    }

    // Create a test user if it doesn't exist
    let testUser = await User.findOne({ where: { username: 'testuser' } });
    if (!testUser) {
      testUser = await User.create({
        username: 'testuser',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'User'
      });
      console.log('Created test user');
    }

    // Create A-1 Launchpad specified components
    const sampleComponents = [
      // 1. RESISTORS
      {
        name: 'Resistor (100 Ohm, 1/4W)',
        manufacturer: 'Generic',
        partNumber: 'R100_1/4W',
        description: 'Carbon Film, 5% Tolerance',
        quantity: 500,
        location: 'R-Shelf-A1',
        unitPrice: 0.50,
        category: 'Resistors',
        criticalThreshold: 100
      },
      {
        name: 'Resistor (1k Ohm, 1/4W)',
        manufacturer: 'Generic',
        partNumber: 'R1K_1/4W',
        description: 'Carbon Film, 5% Tolerance',
        quantity: 500,
        location: 'R-Shelf-A1',
        unitPrice: 0.50,
        category: 'Resistors',
        criticalThreshold: 100
      },
      {
        name: 'Resistor (10k Ohm, 1/4W)',
        manufacturer: 'Generic',
        partNumber: 'R10K_1/4W',
        description: 'Carbon Film, 5% Tolerance',
        quantity: 500,
        location: 'R-Shelf-A1',
        unitPrice: 0.50,
        category: 'Resistors',
        criticalThreshold: 100
      },
      {
        name: 'Resistor (4.7 Ohm, 1W)',
        manufacturer: 'Generic',
        partNumber: 'R4.7_1W',
        description: 'Metal Film, 1% Tolerance',
        quantity: 150,
        location: 'R-Shelf-A2',
        unitPrice: 1.20,
        category: 'Resistors',
        criticalThreshold: 30
      },

      // 2. CAPACITORS
      {
        name: 'Ceramic Cap (0.1uF, 50V)',
        manufacturer: 'Generic',
        partNumber: 'C0.1UF_50V_CER',
        description: 'Ceramic Disc Capacitor',
        quantity: 800,
        location: 'C-Bin-B1',
        unitPrice: 0.80,
        category: 'Capacitors',
        criticalThreshold: 200
      },
      {
        name: 'Electrolytic Cap (100uF, 25V)',
        manufacturer: 'Generic',
        partNumber: 'C100UF_25V_EL',
        description: 'Radial Electrolytic Capacitor',
        quantity: 200,
        location: 'C-Bin-B2',
        unitPrice: 2.50,
        category: 'Capacitors',
        criticalThreshold: 50
      },
      {
        name: 'Tantalum Cap (10uF, 16V)',
        manufacturer: 'KEMET',
        partNumber: 'T491A106K016AT',
        description: 'SMD Tantalum Capacitor',
        quantity: 100,
        location: 'C-Bin-B3',
        unitPrice: 5.00,
        category: 'Capacitors',
        criticalThreshold: 20
      },

      // 3. INDUCTORS
      {
        name: 'Inductor (10uH)',
        manufacturer: 'Generic',
        partNumber: 'L10UH',
        description: 'Radial Lead Inductor',
        quantity: 100,
        location: 'L-Bin-C1',
        unitPrice: 3.00,
        category: 'Inductors',
        criticalThreshold: 25
      },

      // 4. DIODES
      {
        name: '1N4007 Diode',
        manufacturer: 'Fairchild',
        partNumber: '1N4007',
        description: 'Rectifier Diode, 1A, 1000V',
        quantity: 300,
        location: 'D-Bin-D1',
        unitPrice: 1.00,
        category: 'Diodes',
        criticalThreshold: 75
      },
      {
        name: 'Zener Diode (5.1V, 0.5W)',
        manufacturer: 'ON Semiconductor',
        partNumber: '1N5231B',
        description: 'Zener Diode',
        quantity: 150,
        location: 'D-Bin-D2',
        unitPrice: 1.50,
        category: 'Diodes',
        criticalThreshold: 30
      },

      // 5. TRANSISTORS
      {
        name: 'NPN Transistor (BC547)',
        manufacturer: 'NXP',
        partNumber: 'BC547B',
        description: 'NPN BJT, General Purpose',
        quantity: 200,
        location: 'T-Tray-E1',
        unitPrice: 1.20,
        category: 'Transistors',
        criticalThreshold: 50
      },
      {
        name: 'MOSFET (IRF540N)',
        manufacturer: 'Infineon',
        partNumber: 'IRF540N',
        description: 'N-Channel Power MOSFET',
        quantity: 50,
        location: 'T-Tray-E2',
        unitPrice: 25.00,
        category: 'Transistors',
        criticalThreshold: 10
      },

      // 6. INTEGRATED CIRCUITS (ICs)
      {
        name: 'NE555 Timer IC',
        manufacturer: 'Texas Instruments',
        partNumber: 'NE555P',
        description: 'Precision Timer IC',
        quantity: 80,
        location: 'IC-Box-F1',
        unitPrice: 8.00,
        category: 'Integrated Circuits (ICs)',
        criticalThreshold: 20
      },
      {
        name: 'LM358 Op-Amp',
        manufacturer: 'STMicroelectronics',
        partNumber: 'LM358N',
        description: 'Dual Op-Amp',
        quantity: 100,
        location: 'IC-Box-F2',
        unitPrice: 6.00,
        category: 'Integrated Circuits (ICs)',
        criticalThreshold: 25
      },
      {
        name: 'ATmega328P (DIP)',
        manufacturer: 'Microchip',
        partNumber: 'ATMEGA328P-PU',
        description: 'Microcontroller, 8-bit',
        quantity: 30,
        location: 'IC-Box-F3',
        unitPrice: 150.00,
        category: 'Integrated Circuits (ICs)',
        criticalThreshold: 5
      },
      {
        name: 'ESP32-WROOM-32U',
        manufacturer: 'Espressif',
        partNumber: 'ESP32-WROOM-32U',
        description: 'Wi-Fi & Bluetooth Module',
        quantity: 20,
        location: 'IC-Box-F4',
        unitPrice: 200.00,
        category: 'Integrated Circuits (ICs)',
        criticalThreshold: 3
      },

      // 7. CONNECTORS
      {
        name: 'Male Header (2.54mm, 40-pin)',
        manufacturer: 'Generic',
        partNumber: 'HDR-M-2.54-40',
        description: 'Single Row Pin Header',
        quantity: 100,
        location: 'Conn-Drawer-G1',
        unitPrice: 3.50,
        category: 'Connectors',
        criticalThreshold: 20
      },
      {
        name: 'JST-XH Connector (2-pin)',
        manufacturer: 'JST',
        partNumber: 'B2B-XH-A(LF)(SN)',
        description: 'Through-hole, 2-pin',
        quantity: 50,
        location: 'Conn-Drawer-G2',
        unitPrice: 4.00,
        category: 'Connectors',
        criticalThreshold: 10
      },

      // 8. SENSORS
      {
        name: 'DHT11 Temperature/Humidity',
        manufacturer: 'Aosong',
        partNumber: 'DHT11',
        description: 'Digital Temperature & Humidity Sensor',
        quantity: 15,
        location: 'Sensor-Bin-H1',
        unitPrice: 50.00,
        category: 'Sensors',
        criticalThreshold: 3
      },
      {
        name: 'Photoresistor (LDR)',
        manufacturer: 'Generic',
        partNumber: 'GL5516',
        description: 'Light Dependent Resistor',
        quantity: 30,
        location: 'Sensor-Bin-H2',
        unitPrice: 7.00,
        category: 'Sensors',
        criticalThreshold: 5
      },

      // 9. MICROCONTROLLERS/DEV BOARDS
      {
        name: 'Arduino Uno R3',
        manufacturer: 'Arduino',
        partNumber: 'A000066',
        description: 'Development Board',
        quantity: 5,
        location: 'DevBoard-Rack-I1',
        unitPrice: 800.00,
        category: 'Microcontrollers/Development Boards',
        criticalThreshold: 1
      },
      {
        name: 'Raspberry Pi Zero W',
        manufacturer: 'Raspberry Pi Found.',
        partNumber: 'RPI0W',
        description: 'Single-board Computer',
        quantity: 3,
        location: 'DevBoard-Rack-I2',
        unitPrice: 1200.00,
        category: 'Microcontrollers/Development Boards',
        criticalThreshold: 1
      },

      // 10. SWITCHES/BUTTONS
      {
        name: 'Tactile Push Button (6x6mm)',
        manufacturer: 'Generic',
        partNumber: 'BTN-TACT-6X6',
        description: 'Momentary Tactile Switch',
        quantity: 100,
        location: 'Switch-Box-J1',
        unitPrice: 1.00,
        category: 'Switches/Buttons',
        criticalThreshold: 25
      },
      {
        name: 'SPDT Slide Switch',
        manufacturer: 'Generic',
        partNumber: 'SW-SPDT-SLIDE',
        description: 'Single Pole Double Throw Slide Switch',
        quantity: 40,
        location: 'Switch-Box-J2',
        unitPrice: 3.00,
        category: 'Switches/Buttons',
        criticalThreshold: 10
      },

      // 11. LEDs/DISPLAYS
      {
        name: 'Red LED (5mm)',
        manufacturer: 'Generic',
        partNumber: 'LED-RED-5MM',
        description: 'Standard Red LED',
        quantity: 200,
        location: 'LED-Tray-K1',
        unitPrice: 0.80,
        category: 'LEDs/Displays',
        criticalThreshold: 50
      },
      {
        name: '16x2 LCD Display',
        manufacturer: 'Generic',
        partNumber: 'LCD1602',
        description: 'Character LCD Module',
        quantity: 10,
        location: 'LCD-Box-K2',
        unitPrice: 150.00,
        category: 'LEDs/Displays',
        criticalThreshold: 2
      },

      // 12. CABLES/WIRES
      {
        name: 'Jumper Wires (M-M, 40pc)',
        manufacturer: 'Generic',
        partNumber: 'JMP-MM-40',
        description: 'Male-to-Male Jumper Wires, assorted',
        quantity: 10,
        location: 'Cable-Bag-L1',
        unitPrice: 80.00,
        category: 'Cables/Wires',
        criticalThreshold: 2
      },
      {
        name: 'Hook-up Wire (22AWG, Red)',
        manufacturer: 'Generic',
        partNumber: 'WIRE-22AWG-RED',
        description: 'Solid Core Hook-up Wire, 10m roll',
        quantity: 5,
        location: 'Cable-Bag-L2',
        unitPrice: 150.00,
        category: 'Cables/Wires',
        criticalThreshold: 1
      },

      // 13. MECHANICAL PARTS/HARDWARE
      {
        name: 'M3 Screws (10mm)',
        manufacturer: 'Generic',
        partNumber: 'SCR-M3-10MM',
        description: 'Phillips Head, Steel',
        quantity: 200,
        location: 'Mech-Bin-M1',
        unitPrice: 0.50,
        category: 'Mechanical Parts/Hardware',
        criticalThreshold: 50
      },
      {
        name: 'Brass Standoffs (M3, 10mm)',
        manufacturer: 'Generic',
        partNumber: 'STDOFF-M3-10MM',
        description: 'Male-Female Standoff',
        quantity: 100,
        location: 'Mech-Bin-M2',
        unitPrice: 2.00,
        category: 'Mechanical Parts/Hardware',
        criticalThreshold: 20
      },

      // 14. MISCELLANEOUS LAB SUPPLIES
      {
        name: 'Solder Wire (0.8mm)',
        manufacturer: 'Generic',
        partNumber: 'SOLDER-0.8MM',
        description: 'Lead-free Solder, 100g roll',
        quantity: 5,
        location: 'Misc-Shelf-N1',
        unitPrice: 300.00,
        category: 'Miscellaneous Lab Supplies',
        criticalThreshold: 1
      },
      {
        name: 'Breadboard (Full Size)',
        manufacturer: 'Generic',
        partNumber: 'BRDBRD-FULL',
        description: '830 Tie Points',
        quantity: 10,
        location: 'Misc-Shelf-N2',
        unitPrice: 70.00,
        category: 'Miscellaneous Lab Supplies',
        criticalThreshold: 2
      }
    ];

    for (const componentData of sampleComponents) {
      let component = await Component.findOne({ where: { name: componentData.name } });
      if (!component) {
        component = await Component.create(componentData);
        console.log(`Created component: ${component.name} (Qty: ${component.quantity}, Threshold: ${component.criticalThreshold})`);
      } else {
        // Update existing component quantities and thresholds to ensure we have low stock items
        await component.update({ 
          quantity: componentData.quantity,
          criticalThreshold: componentData.criticalThreshold
        });
        console.log(`Updated component: ${component.name} (Qty: ${componentData.quantity}, Threshold: ${componentData.criticalThreshold})`);
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
      console.log(`Created ${sampleLogs.length} sample logs`);
    }

    console.log('Sample data seeding completed!');
    
    // Log current low stock items
    const lowStockItems = await Component.findAll({
      where: {
        quantity: {
          [require('sequelize').Op.lte]: require('sequelize').col('criticalThreshold')
        }
      }
    });
    console.log(`Current low stock items: ${lowStockItems.length}`);
    lowStockItems.forEach(item => {
      console.log(`   - ${item.name}: ${item.quantity}/${item.criticalThreshold} units`);
    });
    
  } catch (error) {
    console.error('Error seeding sample data:', error);
  }
};

module.exports = { seedSampleData };
