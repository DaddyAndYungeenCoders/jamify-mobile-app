// services/event.service.ts
import { API_BASE_URL } from "@/constants/Server";
import { Event, EventCreate } from "@/types/event.types";
import { useAuthenticationStore } from "@/store/authentication.store";

class EventService {
  private static instance: EventService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_BASE_URL}/events`;
  }

  public static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  private getAuthHeaders(): HeadersInit {
    const token = useAuthenticationStore.getState().token;
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        useAuthenticationStore.getState().removeJWTToken();
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }
    return response.json();
  }

  public async getAllEvents(): Promise<Event[]> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: this.getAuthHeaders(),
      });
      // console.log("C EST LE BODY ", response);
      return this.handleResponse<Event[]>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async getEventById(id: number): Promise<Event> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<Event>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async getEventsByStatus(status: Event["status"]): Promise<Event[]> {
    try {
      const response = await fetch(`${this.baseUrl}/with-status/${status}`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<Event[]>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async getEventsByHost(hostId: number): Promise<Event[]> {
    try {
      const response = await fetch(`${this.baseUrl}/by-host/${hostId}`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<Event[]>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async createEvent(event: EventCreate): Promise<Event> {
    try {
      const response = await fetch(`${this.baseUrl}/createHostedEvent`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(event),
      });
      // console.log("TOKEN ", this.getAuthHeaders());
      // console.log(JSON.stringify(response.body));
      // console.log("CE QUON ENVOIE ", JSON.stringify(event));
      return this.handleResponse<Event>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async updateEvent(id: number, event: Partial<Event>): Promise<Event> {
    try {
      const response = await fetch(`${this.baseUrl}/update/${id}`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(event),
      });
      return this.handleResponse<Event>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async joinEvent(eventId: number): Promise<Event> {
    try {
      const response = await fetch(`${this.baseUrl}/join/${eventId}`, {
        method: "POST",
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<Event>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async leaveEvent(eventId: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/leave/${eventId}`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
      });
      await this.handleResponse<void>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async cancelEvent(eventId: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/cancel/${eventId}`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
      });
      await this.handleResponse<void>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async deleteEvent(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/delete/${id}`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      });
      await this.handleResponse<void>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    console.error("EventService Error:", error);
    if (error instanceof Error) {
      return error;
    }
    return new Error("An unexpected error occurred");
  }
}

export const eventService = EventService.getInstance();
