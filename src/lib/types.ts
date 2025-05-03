export enum UserRole {
  ADMIN = "admin",
  STAFF = "staff",
  TOURIST = "tourist",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export enum NotificationRecipient {
  ALL = "all",
  STAFF = "staff",
  TOURISTS = "tourists",
  ADMINS = "admins",
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface Admin extends User {
  role: UserRole.ADMIN;
  permissions: string[];
}

export interface Staff extends User {
  role: UserRole.STAFF;
  department: string;
  supervisor: string;
}

export interface Tourist extends User {
  role: UserRole.TOURIST;
  nationality: string;
  preferences?: string[];
}

export enum TicketType {
  REGULAR = "regular",
  VIP = "vip",
  GROUP = "group",
  STUDENT = "student",
  SENIOR = "senior",
  CHILD = "child",
}

export enum Currency {
  USD = "usd",
  EURO = "euro",
  POUND = "pound",
  YEN = "yen",
  LOCAL = "local",
}
export interface ContactPerson {
  name: string;
  email: string;
  phone: string;
  nationality?: string;
}

export interface TicketPurchaseData {
  ticketType: string | null;
  isVIP: boolean;
  rulesAgreed: boolean;
  visitDate: Date | null;
  visitTime: string;
  eventId: string | null;
  isLocal: boolean;
  numberOfTickets: number;
  isGroupTicket: boolean;
  personalInfo: ContactPerson;
  subscribeToNewsletter: boolean;
  paymentMethod: string;
  currency: Currency;
  paymentComplete: boolean;
  transactionId: string | null;
}

export interface Ticket {
  id: string;
  type: TicketType;
  prices: Price[];
  expirationDate: Date;
  isGroupTicket: boolean;
  purchasedAt: Date;
  visitDate: Date;
  isUsed: boolean;
  usedAt?: Date;
  qrCode: string;
  eventId?: string;
  isLocal?: boolean;
  contactPersonDetails?: ContactPerson; // Make it optional if needed
  purchasedBy?: string;
}
export enum EventStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  status: EventStatus;
  organizer: {
    name: string;
    email: string;
    phone: string;
  };
  ticketTypes?: {
    regular?: number;
    vip: number;
  };
  ticketPrice?: Price[];
  maxAttendees: number;
  maxTickets?: number;
  ticketsSold?: number;
  ticketsAvailable: boolean;
  isPublic: boolean;
  isHidden?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface Price {
  currency: Currency;
  amount: number;
}
export enum NotificationType {
  SYSTEM = "system",
  EVENT = "event",
  TICKET = "ticket",
  PROMOTION = "promotion",
  ANNOUNCEMENT = "announcement",
  EVENT_CREATED = "event_created",
  EVENT_UPDATED = "event_updated",
  EVENT_HIDDEN = "event_hidden",
  TICKET_PURCHASED = "ticket_purchased",
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  recipients: NotificationRecipient;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
  sentBy?: string;
}

export enum ReportType {
  SALES = "sales",
  ATTENDANCE = "attendance",
  REVENUE = "revenue",
  CUSTOM = "custom",
}

export interface Report {
  id: string;
  title: string;
  criteria: {
    startDate?: Date;
    endDate?: Date;
    ticketType?: TicketType;
    eventId?: string;
    isLocal?: boolean;
  };
  generatedBy: string;
  createdAt: Date;
  data?: {
    totalSales?: number;
    regularTickets?: number;
    vipTickets?: number;
    revenue?: {
      local: number;
      usd: number;
      pound: number;
      euro: number;
      yen: number;
    };
    totalAttendance?: number;
    localVisitors?: number;
    foreignVisitors?: number;
  };
  format: "pdf" | "excel";
}

export enum ReportType {
  ALL = "all",
  TICKET = "ticket",
  EVENT = "event",
  VISITOR = "visitor",
}
