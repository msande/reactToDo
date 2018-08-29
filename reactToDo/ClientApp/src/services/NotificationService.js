
export class NotificationService {

    isBrowserNotificationSupported() {

        if (!("Notification" in window)) {
            // Browser notifications not allowed. Do nothing.
            return false;
        }
        return true;
    }

    requestPermission() {

        if (!this.isBrowserNotificationSupported()) {
            return false;
        }

        Notification.requestPermission(
            (permission) => { }
        )
    }

    notify(message) {

        if (!this.isBrowserNotificationSupported()) {
            return false;
        }

        Notification.requestPermission(
            (permission) => {
                if (permission === "granted") {
                    new Notification(message);
                }
            }
        )
    }
}