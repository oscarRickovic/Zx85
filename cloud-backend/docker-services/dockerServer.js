const Docker = require('dockerode');
const docker = new Docker();

// Function to create a container with specified resource limits
async function createUserContainer(containerName) {
  try {
    const memoryInBytes = 536870912; // 512MB in bytes
    const cpuShares = 1024; // CPU shares (relative weight for CPU usage, default is 1024)

    const container = await docker.createContainer({
      Image: 'ubuntu:latest', // You can use the latest Ubuntu image
      name: containerName,
      HostConfig: {
        Memory: memoryInBytes, // Pass the memory in bytes
        CpuShares: cpuShares, // Set CPU shares if needed
      },
      Tty: true, // Enable pseudo-TTY for terminal
      OpenStdin: true, // Enable interactive mode
    });

    await container.start(); // Start the container
    console.log(`Container ${containerName} created and started successfully`);
  } catch (error) {
    console.error(`Error creating container: ${error}`);
  }
}

// Example usage
createUserContainer('hakimmovic');
