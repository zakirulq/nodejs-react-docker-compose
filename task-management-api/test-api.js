const fetch = require('node-fetch');

async function testAPI() {
  const baseUrl = 'http://localhost:5469';
  
  try {
    // Test health endpoint
    console.log('Testing health endpoint...');
    const healthResponse = await fetch(`${baseUrl}/health`);
    const healthData = await healthResponse.json();
    console.log('Health check result:', healthData);
    
    // Test tasks endpoint
    console.log('\nTesting tasks endpoint...');
    const tasksResponse = await fetch(`${baseUrl}/tasks`);
    const tasksData = await tasksResponse.json();
    console.log('Tasks result:', tasksData);
    
    // Test creating a task
    console.log('\nTesting task creation...');
    const createResponse = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Task',
        description: 'This is a test task',
        isCompleted: false
      })
    });
    
    if (createResponse.ok) {
      const createdTask = await createResponse.json();
      console.log('Created task:', createdTask);
    } else {
      console.error('Failed to create task:', createResponse.status, createResponse.statusText);
    }
    
  } catch (error) {
    console.error('API test failed:', error.message);
  }
}

testAPI(); 