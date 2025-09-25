#!/usr/bin/env node

const { spawn } = require('child_process');
const os = require('os');

// Get all network interfaces
function getNetworkAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (interface.family === 'IPv4' && !interface.internal) {
        addresses.push(interface.address);
      }
    }
  }
  
  return addresses;
}

// Display network information
function displayNetworkInfo(port = 3000) {
  const addresses = getNetworkAddresses();
  
  console.log('\n🌐 Canvas Discussion Analytics - Network Access');
  console.log('=' .repeat(50));
  console.log('📱 Access from your mobile device:');
  console.log('');
  
  addresses.forEach((address, index) => {
    console.log(`   📍 Option ${index + 1}: http://${address}:${port}`);
  });
  
  console.log('');
  console.log('💻 Local access:');
  console.log(`   🏠 http://localhost:${port}`);
  console.log('');
  console.log('📝 Make sure your mobile device is on the same WiFi network!');
  console.log('=' .repeat(50));
  console.log('');
}

// Start Next.js dev server
console.log('🚀 Starting Canvas Discussion Analytics...');

const nextProcess = spawn('npx', ['next', 'dev', '-H', '0.0.0.0'], {
  stdio: 'pipe',
  shell: true
});

// Handle Next.js output
nextProcess.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(output);
  
  // Detect when server is ready and show network info
  if (output.includes('Ready') || output.includes('started server')) {
    // Extract port from output
    const portMatch = output.match(/:(\d+)/);
    const port = portMatch ? portMatch[1] : '3000';
    
    setTimeout(() => {
      displayNetworkInfo(port);
    }, 500);
  }
});

nextProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});

nextProcess.on('close', (code) => {
  console.log(`\n👋 Next.js process exited with code ${code}`);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  nextProcess.kill('SIGINT');
  process.exit(0);
});
