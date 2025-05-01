// Mock data for the Museum Ticketing System
import {
  User,
  UserRole,
  UserStatus,
  Staff,
  Tourist,
  TicketType,
  Currency,
  // Renamed for clarity and consistency
  Event,
  EventStatus,
  Notification,
  NotificationType,
  NotificationRecipient,
  Report,
  // More explicit import
  // More explicit import
} from "./types";

// Utility function to create dates easily
const createDate = (year: number, month: number, day: number): Date =>
  new Date(year, month - 1, day);

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@museum.com",
    password: "admin123",
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    createdAt: createDate(2025, 1, 1),
    updatedAt: createDate(2025, 1, 1),
  },
  {
    id: "2",
    name: "Staff Member 1",
    email: "staff1@museum.com",
    password: "staff123",
    role: UserRole.STAFF,
    status: UserStatus.ACTIVE,
    createdAt: createDate(2025, 1, 15),
    updatedAt: createDate(2025, 1, 15),
  },
  {
    id: "3",
    name: "Staff Member 2",
    email: "staff2@museum.com",
    password: "staff456",
    role: UserRole.STAFF,
    status: UserStatus.ACTIVE,
    createdAt: createDate(2025, 2, 1),
    updatedAt: createDate(2025, 2, 1),
  },
  {
    id: "4",
    name: "Local Tourist",
    email: "local@example.com",
    password: "tourist123",
    role: UserRole.TOURIST,
    status: UserStatus.ACTIVE,
    createdAt: createDate(2025, 3, 1),
    updatedAt: createDate(2025, 3, 1),
  },
  {
    id: "5",
    name: "Foreign Tourist",
    email: "foreign@example.com",
    password: "tourist456",
    role: UserRole.TOURIST,
    status: UserStatus.ACTIVE,
    createdAt: createDate(2025, 3, 15),
    updatedAt: createDate(2025, 3, 15),
  },
];

// Mock Staff details - Improved by directly mapping from users
export const mockStaff: Staff[] = mockUsers
  .filter((user) => user.role === UserRole.STAFF)
  .map((user, index) => ({
    ...user,
    role: UserRole.STAFF, // Ensure the role is explicitly set and matches the interface
    position: index === 0 ? "Ticket Manager" : "Event Coordinator",
    department: "Operations", // Example department - replace with actual data
    supervisor: "Admin User", // Example supervisor - replace with actual data
  }));
// Mock Tourists details - Improved by directly mapping from users
export const mockTourists: Tourist[] = mockUsers
  .filter((user) => user.role === UserRole.TOURIST)
  .map((user, index) => ({
    ...user,
    role: UserRole.TOURIST, // Explicitly set the role to the specific Tourist role
    isLocal: index === 0,
    phone: index === 0 ? "+1234567890" : "+9876543210",
    nationality: index === 1 ? "United Kingdom" : "Ethiopian", // Provide a default nationality
    preferences: index === 0 ? ["History", "Art"] : ["Modern Art"], // Example preferences
  }));

// Mock Ticket Prices - Renamed to Price for consistency
const regularTicketPrices: Price[] = [
  { currency: Currency.LOCAL, amount: 500 },
  { currency: Currency.USD, amount: 15 },
  { currency: Currency.POUND, amount: 12 },
  { currency: Currency.EURO, amount: 14 },
  { currency: Currency.YEN, amount: 2000 },
];

const vipTicketPrices: Price[] = [
  { currency: Currency.LOCAL, amount: 1000 },
  { currency: Currency.USD, amount: 30 },
  { currency: Currency.POUND, amount: 24 },
  { currency: Currency.EURO, amount: 28 },
  { currency: Currency.YEN, amount: 4000 },
];

// Mock Tickets - More consistent and readable
export const mockTickets: Ticket[] = [
  {
    id: "TKT001",
    type: TicketType.REGULAR,
    prices: regularTicketPrices,
    expirationDate: createDate(2025, 5, 1),
    isGroupTicket: false,
    purchasedAt: createDate(2025, 4, 1),
    visitDate: createDate(2025, 4, 15),
    isUsed: false,
    qrCode: "QR12345",
    purchasedBy: "4",
    contactPersonDetails: undefined, // Only for group tickets
  },
  {
    id: "TKT002",
    type: TicketType.REGULAR,
    prices: regularTicketPrices,
    expirationDate: createDate(2025, 5, 15),
    isGroupTicket: false,
    purchasedAt: createDate(2025, 4, 2),
    visitDate: createDate(2025, 4, 20),
    isUsed: false,
    qrCode: "QR67890",
    purchasedBy: "5",
    contactPersonDetails: undefined,
  },
  {
    id: "TKT003",
    type: TicketType.VIP,
    prices: vipTicketPrices,
    expirationDate: createDate(2025, 5, 10),
    isGroupTicket: false,
    purchasedAt: createDate(2025, 4, 3),
    visitDate: createDate(2025, 4, 25),
    isUsed: false,
    qrCode: "QR11223",
    purchasedBy: "5",
    contactPersonDetails: undefined,
  },
  {
    id: "TKT004",
    type: TicketType.REGULAR,
    prices: regularTicketPrices,
    expirationDate: createDate(2025, 6, 1),
    isGroupTicket: true,
    purchasedAt: createDate(2025, 4, 5),
    visitDate: createDate(2025, 5, 10),
    isUsed: false,
    qrCode: "QR44556",
    purchasedBy: "4",
    contactPersonDetails: {
      name: "Group Leader",
      email: "group@example.com",
      phone: "+1122334455",
    },
  },
  {
    id: "TKT005",
    type: TicketType.REGULAR,
    prices: regularTicketPrices,
    expirationDate: createDate(2025, 5, 20),
    isGroupTicket: false,
    purchasedAt: createDate(2025, 4, 10),
    visitDate: createDate(2025, 5, 15),
    isUsed: false,
    qrCode: "QR77889",
    eventId: "EVT001",
    purchasedBy: "4",
    contactPersonDetails: undefined,
  },
  {
    id: "TKT006",
    type: TicketType.VIP,
    prices: vipTicketPrices,
    expirationDate: createDate(2025, 6, 15),
    isGroupTicket: false,
    purchasedAt: createDate(2025, 4, 12),
    visitDate: createDate(2025, 6, 1),
    isUsed: false,
    qrCode: "QR99001",
    eventId: "EVT002",
    purchasedBy: "5",
    contactPersonDetails: undefined,
  },
  {
    id: "TKT007",
    type: TicketType.REGULAR,
    prices: regularTicketPrices,
    expirationDate: createDate(2025, 7, 1),
    isGroupTicket: false,
    purchasedAt: createDate(2025, 4, 15),
    visitDate: createDate(2025, 6, 20),
    isUsed: false,
    qrCode: "QR22334",
    purchasedBy: "4",
    contactPersonDetails: undefined,
  },
  {
    id: "TKT008",
    type: TicketType.VIP,
    prices: vipTicketPrices,
    expirationDate: createDate(2025, 7, 15),
    isGroupTicket: true,
    purchasedAt: createDate(2025, 4, 20),
    visitDate: createDate(2025, 7, 1),
    isUsed: false,
    qrCode: "QR55667",
    purchasedBy: "5",
    contactPersonDetails: {
      name: "VIP Group Leader",
      email: "vipgroup@example.com",
      phone: "+9988776655",
    },
  },
  {
    id: "TKT009",
    type: TicketType.REGULAR,
    prices: regularTicketPrices,
    expirationDate: createDate(2025, 8, 1),
    isGroupTicket: false,
    purchasedAt: createDate(2025, 4, 25),
    visitDate: createDate(2025, 7, 15),
    isUsed: false,
    qrCode: "QR88990",
    eventId: "EVT003",
    purchasedBy: "4",
    contactPersonDetails: undefined,
  },
  {
    id: "TKT010",
    type: TicketType.VIP,
    prices: vipTicketPrices,
    expirationDate: createDate(2025, 8, 15),
    isGroupTicket: false,
    purchasedAt: createDate(2025, 4, 30),
    visitDate: createDate(2025, 8, 1),
    isUsed: false,
    qrCode: "QR00112",
    purchasedBy: "5",
    contactPersonDetails: undefined,
  },
];

// Mock Events - Added IDs for consistency
export const mockEvents: Event[] = [
  {
    id: "EVT001",
    title: "Modern Art Exhibition",
    description: "A showcase of contemporary art pieces from around the world.",
    organizer: {
      name: "Art Association",
      email: "art@example.com",
      phone: "+1234567890",
    },
    startDate: createDate(2025, 5, 15),
    endDate: createDate(2025, 5, 20),
    status: EventStatus.APPROVED,
    maxTickets: 100,
    ticketsSold: 45,
    ticketPrice: [
      { currency: Currency.LOCAL, amount: 500 }, // Use Currency.LOCAL
      { currency: Currency.USD, amount: 15 }, // Use Currency.USD
    ],
    createdAt: createDate(2025, 3, 1),
    updatedAt: createDate(2025, 3, 15),
    isHidden: false,
    location: "Grand Gallery Hall A",
    maxAttendees: 150,
    ticketsAvailable: true,
    isPublic: true,
  },
  {
    id: "EVT002",
    title: "Historical Lecture Series",
    description:
      "A series of lectures on the history of ancient civilizations.",
    organizer: {
      name: "History Society",
      email: "history@example.com",
      phone: "+2345678901",
    },
    startDate: createDate(2025, 6, 1),
    endDate: createDate(2025, 6, 5),
    status: EventStatus.APPROVED,
    maxTickets: 50,
    ticketsSold: 30,
    ticketPrice: [
      { currency: Currency.LOCAL, amount: 1000 }, // Use Currency.LOCAL
      { currency: Currency.USD, amount: 30 }, // Use Currency.USD
    ],
    createdAt: createDate(2025, 3, 10),
    updatedAt: createDate(2025, 3, 20),
    isHidden: false,
    location: "Lecture Hall 2",
    maxAttendees: 75,
    ticketsAvailable: true,
    isPublic: true,
  },
  {
    id: "EVT003",
    title: "Interactive Science Workshop",
    description: "Hands-on science experiments for all ages.",
    organizer: {
      name: "Science Club",
      email: "science@example.com",
      phone: "+3456789012",
    },
    startDate: createDate(2025, 7, 15),
    endDate: createDate(2025, 7, 20),
    status: EventStatus.PENDING,
    maxTickets: 75,
    ticketsSold: 0,
    ticketPrice: [
      { currency: Currency.LOCAL, amount: 600 }, // Use Currency.LOCAL
      { currency: Currency.USD, amount: 20 }, // Use Currency.USD
    ],
    createdAt: createDate(2025, 4, 1),
    updatedAt: createDate(2025, 4, 1),
    isHidden: false,
    location: "Science Lab A",
    maxAttendees: 100,
    ticketsAvailable: true,
    isPublic: false,
  },
];

// Mock Notifications - Added IDs for consistency
export const mockNotifications: Notification[] = [
  {
    id: "NOT001",
    type: NotificationType.EVENT_CREATED,
    recipients: NotificationRecipient.ALL,
    title: "New Event: Modern Art Exhibition",
    content:
      "A new art exhibition has been scheduled for May 15-20, 2025. Tickets are now available.",
    createdAt: createDate(2025, 3, 1),
    isRead: true,
    sentBy: "1", // Admin
  },
  {
    id: "NOT002",
    type: NotificationType.EVENT_CREATED,
    recipients: NotificationRecipient.ALL,
    title: "New Event: Historical Lecture Series",
    content:
      "A series of historical lectures has been scheduled for June 1-5, 2025. Tickets are now available.",
    createdAt: createDate(2025, 3, 10),
    isRead: true,
    sentBy: "1", // Admin
  },
  {
    id: "NOT003",
    type: NotificationType.ANNOUNCEMENT,
    recipients: NotificationRecipient.TOURISTS,
    title: "Special Discount for Local Visitors",
    content:
      "Local visitors can enjoy a 10% discount on all regular tickets during the month of May.",
    createdAt: createDate(2025, 4, 1),
    isRead: false,
    sentBy: "1", // Admin
  },
  {
    id: "NOT004",
    type: NotificationType.TICKET_PURCHASED,
    recipients: NotificationRecipient.STAFF,
    title: "VIP Ticket Purchase",
    content:
      "A new VIP ticket has been purchased for the Historical Lecture Series.",
    createdAt: createDate(2025, 4, 12),
    isRead: false,
    sentBy: "1", // Admin
  },
  {
    id: "NOT005",
    type: NotificationType.EVENT_UPDATED,
    recipients: NotificationRecipient.ALL,
    title: "Event Update: Modern Art Exhibition",
    content:
      "The Modern Art Exhibition has been extended by one day. It will now end on May 21, 2025.",
    createdAt: createDate(2025, 4, 15),
    isRead: false,
    sentBy: "1", // Admin
  },
];

// Mock Reports - Added IDs for consistency and more realistic criteria
export const mockReports: Report[] = [
  {
    id: "RPT001",
    title: "Monthly Ticket Sales - April 2025",
    criteria: {
      startDate: createDate(2025, 4, 1),
      endDate: createDate(2025, 4, 30),
    } as ReportCriteria,
    generatedBy: "1", // Admin
    createdAt: createDate(2025, 5, 1),
    data: {
      totalSales: 15,
      regularTickets: 10,
      vipTickets: 5,
      revenue: {
        local: 10000,
        usd: 300,
        pound: 240,
        euro: 280,
        yen: 40000,
      },
    } as ReportData,
    format: "pdf",
  },
  {
    id: "RPT002",
    title: "Event Attendance - Modern Art Exhibition",
    criteria: {
      eventId: "EVT001",
      startDate: createDate(2025, 5, 15),
      endDate: createDate(2025, 5, 21),
    } as ReportCriteria,
    generatedBy: "2", // Staff
    createdAt: createDate(2025, 5, 22),
    data: {
      totalAttendance: 45,
      localVisitors: 30,
      foreignVisitors: 15,
      regular: 40,
      vip: 5,
    } as ReportData,
    format: "excel",
  },
  {
    id: "RPT003",
    title: "Visitor Demographics - Q2 2025",
    criteria: {
      startDate: createDate(2025, 4, 1),
      endDate: createDate(2025, 6, 30),
    } as ReportCriteria,
    generatedBy: "1", // Admin
    createdAt: createDate(2025, 7, 1),
    data: {
      totalVisitors: 500,
      localPercentage: 60,
      foreignPercentage: 40,
      ageGroups: {
        under18: 100,
        "18-30": 150,
        "31-50": 200,
        over50: 50,
      },
    } as ReportData,
    format: "pdf",
  },
];

// Export all mock data
export const mockData = {
  users: mockUsers,
  staff: mockStaff,
  tourists: mockTourists,
  tickets: mockTickets,
  events: mockEvents,
  notifications: mockNotifications,
  reports: mockReports,
};

// Ensure the ContactPerson interface is correctly exported if needed elsewhere
export interface ContactPerson {
  name: string;
  email: string;
  phone: string;
}

// Ensure the Ticket interface is correctly exported if needed elsewhere
export interface Ticket {
  id: string;
  type: TicketType;
  prices: Price[]; // Use the Price interface
  expirationDate: Date;
  isGroupTicket: boolean;
  purchasedAt: Date;
  visitDate: Date;
  isUsed: boolean;
  usedAt?: Date;
  qrCode: string;
  eventId?: string;
  isLocal?: boolean;
  contactPersonDetails?: ContactPerson; // Make optional for non-group tickets
  purchasedBy?: string;
}

// Ensure the Price interface is correctly exported if needed elsewhere
export interface Price {
  currency: Currency;
  amount: number;
}

// Ensure the ReportCriteria interface is correctly exported if needed elsewhere
export interface ReportCriteria {
  startDate?: Date;
  endDate?: Date;
  ticketType?: TicketType;
  eventId?: string;
  isLocal?: boolean;
}

// Ensure the ReportData interface is correctly exported if needed elsewhere
export interface ReportData {
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
  regular?: number; // For event attendance
  vip?: number; // For event attendance
  totalVisitors?: number; // For visitor demographics
  localPercentage?: number;
  foreignPercentage?: number;
  ageGroups?: {
    under18: number;
    "18-30": number;
    "31-50": number;
    over50: number;
  };
}
