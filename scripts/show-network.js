#!/usr/bin/env node

const os = require('os');

// Get all network interfaces
function getNetworkAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (interface.family === 'IPv4' && !interface.internal) {
        addresses.push({
          address: interface.address,
          name: name
        });
      }
    }
  }
  
  return addresses;
}

// Display current network addresses
function showNetworkInfo() {
  const addresses = getNetworkAddresses();
  const port = process.argv[2] || '3000';
  
  console.log('\n🌐 Canvas Discussion Analytics - Available Network Addresses');
  console.log('='.repeat(65));
  console.log('📱 Mobile Access URLs:');
  console.log('');
  
  if (addresses.length === 0) {
    console.log('   ❌ No network interfaces found');
  } else {
    addresses.forEach((addr, index) => {
      console.log(`   📍 ${addr.name}: http://${addr.address}:${port}`);
    });
  }
  
  console.log('');
  console.log('💻 Local Access:');
  console.log(`   🏠 http://localhost:${port}`);
  console.log('');
  console.log('📝 Instructions:');
  console.log('   1. Connect your phone to the same WiFi network');
  console.log('   2. Open browser on your phone');
  console.log('   3. Type any of the mobile URLs above');
  console.log('   4. Enjoy your app on mobile! 🎉');
  console.log('='.repeat(65));
  console.log('');
}

showNetworkInfo();
