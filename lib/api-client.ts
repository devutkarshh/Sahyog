class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl = "") {
    this.baseUrl = baseUrl
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth-token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth-token", token)
      // Also set as cookie for middleware
      document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Strict`
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-token")
      // Clear cookie
      document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}/api${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Network error" }))
        throw new Error(error.error || "Request failed")
      }

      return response.json()
    } catch (error) {
      console.error("[v0] API request failed:", error)
      throw error
    }
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    this.setToken(response.token)
    return response
  }

  async register(userData: any) {
    const response = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
    this.setToken(response.token)
    return response
  }

  // Appointments
  async getAppointments(userId: string, role: string) {
    return this.request(`/appointments?userId=${userId}&role=${role}`)
  }

  async createAppointment(appointmentData: any) {
    return this.request("/appointments", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    })
  }

  // Health Records
  async getHealthRecords(patientId: string, type?: string) {
    const query = type ? `?patientId=${patientId}&type=${type}` : `?patientId=${patientId}`
    return this.request(`/health-records${query}`)
  }

  async createHealthRecord(recordData: any) {
    return this.request("/health-records", {
      method: "POST",
      body: JSON.stringify(recordData),
    })
  }

  // Pharmacy
  async getMedicines(search?: string, category?: string) {
    const params = new URLSearchParams()
    if (search) params.append("search", search)
    if (category) params.append("category", category)
    const query = params.toString() ? `?${params.toString()}` : ""
    return this.request(`/pharmacy/medicines${query}`)
  }

  async reserveMedicine(medicineId: string, pharmacyId: string, quantity: number) {
    return this.request("/pharmacy/medicines", {
      method: "POST",
      body: JSON.stringify({ medicineId, pharmacyId, quantity }),
    })
  }

  // Symptom Checker
  async analyzeSymptoms(symptoms: string[], age: number, gender: string, duration: string, severity: string) {
    return this.request("/symptom-checker", {
      method: "POST",
      body: JSON.stringify({ symptoms, age, gender, duration, severity }),
    })
  }

  // Video Consultation
  async startConsultation(appointmentId: string) {
    return this.request("/video-consultation", {
      method: "POST",
      body: JSON.stringify({ appointmentId, action: "start" }),
    })
  }

  async joinConsultation(sessionId: string, participantInfo: any) {
    return this.request("/video-consultation", {
      method: "POST",
      body: JSON.stringify({ sessionId, participantInfo, action: "join" }),
    })
  }

  async endConsultation(sessionId: string) {
    return this.request("/video-consultation", {
      method: "POST",
      body: JSON.stringify({ sessionId, action: "end" }),
    })
  }

  // Notifications
  async getNotifications() {
    return this.request("/notifications")
  }

  async markNotificationRead(notificationId: string, read: boolean) {
    return this.request("/notifications", {
      method: "PUT",
      body: JSON.stringify({ notificationId, read }),
    })
  }

  async createNotification(notificationData: any) {
    return this.request("/notifications", {
      method: "POST",
      body: JSON.stringify(notificationData),
    })
  }
}

export const apiClient = new ApiClient()
