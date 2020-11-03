export interface CronJobRequestModal {
    email: string,
    hour: "15min" | "30min" | "1hr" | "2hr" | "4hr" | "6hr" | "8hr" | "12hr" | "1day" | "1week" | "1month"
}

export interface CronStatusResponse {
    status: "Running" | "Not running",
    cronFrequency: string | null,
    email: string
}