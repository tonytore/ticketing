export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["STAFF"] = "staff";
    UserRole["TOURIST"] = "tourist";
})(UserRole || (UserRole = {}));
export var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["DISABLED"] = "DISABLED";
})(UserStatus || (UserStatus = {}));
export var NotificationRecipient;
(function (NotificationRecipient) {
    NotificationRecipient["ALL"] = "all";
    NotificationRecipient["STAFF"] = "staff";
    NotificationRecipient["TOURISTS"] = "tourists";
    NotificationRecipient["ADMINS"] = "admins";
})(NotificationRecipient || (NotificationRecipient = {}));
export var TicketType;
(function (TicketType) {
    TicketType["REGULAR"] = "regular";
    TicketType["VIP"] = "vip";
    TicketType["GROUP"] = "group";
    TicketType["STUDENT"] = "student";
    TicketType["SENIOR"] = "senior";
    TicketType["CHILD"] = "child";
})(TicketType || (TicketType = {}));
export var Currency;
(function (Currency) {
    Currency["USD"] = "usd";
    Currency["EURO"] = "euro";
    Currency["POUND"] = "pound";
    Currency["YEN"] = "yen";
    Currency["LOCAL"] = "local";
})(Currency || (Currency = {}));
export var EventStatus;
(function (EventStatus) {
    EventStatus["PENDING"] = "pending";
    EventStatus["APPROVED"] = "approved";
    EventStatus["REJECTED"] = "rejected";
})(EventStatus || (EventStatus = {}));
export var NotificationType;
(function (NotificationType) {
    NotificationType["SYSTEM"] = "system";
    NotificationType["EVENT"] = "event";
    NotificationType["TICKET"] = "ticket";
    NotificationType["PROMOTION"] = "promotion";
    NotificationType["ANNOUNCEMENT"] = "announcement";
    NotificationType["EVENT_CREATED"] = "event_created";
    NotificationType["EVENT_UPDATED"] = "event_updated";
    NotificationType["EVENT_HIDDEN"] = "event_hidden";
    NotificationType["TICKET_PURCHASED"] = "ticket_purchased";
})(NotificationType || (NotificationType = {}));
export var ReportType;
(function (ReportType) {
    ReportType["SALES"] = "sales";
    ReportType["ATTENDANCE"] = "attendance";
    ReportType["REVENUE"] = "revenue";
    ReportType["CUSTOM"] = "custom";
})(ReportType || (ReportType = {}));
(function (ReportType) {
    ReportType["ALL"] = "all";
    ReportType["TICKET"] = "ticket";
    ReportType["EVENT"] = "event";
    ReportType["VISITOR"] = "visitor";
})(ReportType || (ReportType = {}));
