const Docker = require('dockerode');
const docker = new Docker();

// input : name of container
// output : none, create container with given name.
// Doesn't have any exception handler
async function createUserContainer(containerName) {
  try {
    const memoryInBytes = 536870912; // 512MB in bytes
    const cpuShares = 1024;
    const container = await docker.createContainer({
      Image: 'ubuntu:latest',
      name: containerName,
      HostConfig: {
        Memory: memoryInBytes,
        CpuShares: cpuShares,
      },
      Tty: true,
      OpenStdin: true,
    });

    await container.start();
    console.log(`Container ${containerName} created and started successfully`);
  } catch (error) {
    console.error(`Error creating container: ${error}`);
  }
}

// test the function
createUserContainer('hakimmovic');
