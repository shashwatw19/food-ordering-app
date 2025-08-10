const BACKEND_URL = import.meta.env.VITE_BASE_URL!;
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes (Render sleeps after 15 minutes of inactivity)

class HealthPingService {
  private intervalId: NodeJS.Timeout | null = null;
  private isActive = false;

  start() {
    if (this.isActive) return;
    
    this.isActive = true;
    console.log('🏥 Health ping service started');
    
    // Ping immediately
    this.pingServer();
    
    // Then ping every 14 minutes
    this.intervalId = setInterval(() => {
      this.pingServer();
    }, PING_INTERVAL);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isActive = false;
    console.log('🏥 Health ping service stopped');
  }

  private async pingServer() {
    try {
      const response = await fetch(`${BACKEND_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Server ping successful:', data.data.message);
      } else {
        console.warn('Server ping failed with status:', response.status);
      }
    } catch (error) {
      console.error(' Server ping error:', error);
    }
  }

  // Manual ping method
  async ping() {
    await this.pingServer();
  }
}

export const healthPingService = new HealthPingService();