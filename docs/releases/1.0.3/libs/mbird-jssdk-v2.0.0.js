// Acrelec Software (c) 2016 - 2017
// version 2.0.0
// release date: 08.08.2017
var MBirdSdk;
(function (MBirdSdk) {
    function isConnected() {
        var sdkHandler = window["JavaScriptSdkHandlerAsync"];
        return (sdkHandler != null);
    }
    MBirdSdk.isConnected = isConnected;
    function SdkVersion() {
        return "2.0.0";
    }
    MBirdSdk.SdkVersion = SdkVersion;
    class Base {
        static executeCommand(command) {
            var sdkHandler = window["JavaScriptSdkHandlerAsync"];
            return new Promise((resolve) => {
                sdkHandler.executeWithCommand(command).then(response => {
                    var responseParsed = "";
                    try {
                        responseParsed = JSON.parse(response);
                    }
                    catch (ex) {
                        resolve(response);
                    }
                    if (sdkHandler && command != null) {
                        try {
                            var obj = JSON.parse(responseParsed.toString());
                            resolve(obj);
                        }
                        catch (ex) {
                            resolve(responseParsed);
                        }
                    }
                    resolve(response);
                });
            });
        }
        static executeNumber(command, value) {
            var sdkHandler = window["JavaScriptSdkHandlerAsync"];
            return new Promise((resolve) => {
                sdkHandler.executeWithNumber(command, value).then(response => {
                    var responseParsed = "";
                    try {
                        responseParsed = JSON.parse(response);
                    }
                    catch (ex) {
                        resolve(response);
                    }
                    if (sdkHandler && command != null) {
                        try {
                            var obj = JSON.parse(responseParsed.toString());
                            resolve(obj);
                        }
                        catch (ex) {
                            resolve(responseParsed);
                        }
                    }
                    resolve(response);
                });
            });
        }
        static executeString(command, content) {
            var sdkHandler = window["JavaScriptSdkHandlerAsync"];
            return new Promise((resolve) => {
                sdkHandler.executeWithString(command, content).then(response => {
                    var responseParsed = "";
                    try {
                        responseParsed = JSON.parse(response);
                    }
                    catch (ex) {
                        resolve(response);
                    }
                    if (sdkHandler && command != null) {
                        try {
                            var obj = JSON.parse(responseParsed.toString());
                            resolve(obj);
                        }
                        catch (ex) {
                            resolve(responseParsed);
                        }
                    }
                    resolve(response);
                });
            });
        }
    }
    class UserInterface extends Base {
        static CloseButton(alignment, imageBase64, xPadding, yPadding) {
            return new Promise((resolve, reject) => {
                if (alignment == null) {
                    reject("Alignment type cannot be null!");
                    return;
                }
                var obj = {
                    xPadding: xPadding,
                    yPadding: yPadding,
                    alignment: UIAlignment[alignment],
                    imageBase64: imageBase64
                };
                this.executeString("UIChangeCloseButton", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
    }
    MBirdSdk.UserInterface = UserInterface;
    class Core extends Base {
        static BrowserVersion() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetBrowserVersion").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static OpenAdmin() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("OpenAdmin").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static GetVolume() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetVolume").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(Number(response.Result));
                });
            });
        }
        static GetWeather() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetWeather").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static UpdateVolume(value) {
            return new Promise((resolve, reject) => {
                if (value == null || value.length === 0) {
                    reject("Value cannot be null or empty!");
                    return;
                }
                Base.executeNumber("UpdateVolume", parseInt(value)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static Hide() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("Hide").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static Callback(message, params) {
            var response;
            switch (message) {
                case "BundlesettingsChanged":
                    {
                        CallbacksManager.Trigger("BundlesettingsChanged", null);
                        break;
                    }
                case "PayProgress":
                    {
                        try {
                            response = JSON.parse(params);
                        }
                        catch (ex) {
                            response = params;
                        }
                        CallbacksManager.Trigger("PayProgress", response);
                        break;
                    }
                case "NewMessage":
                    {
                        try {
                            response = JSON.parse(params);
                        }
                        catch (ex) {
                            response = params;
                        }
                        CallbacksManager.Trigger("NewMessage", response);
                        break;
                    }
                case "WingsNewMessage":
                    {
                        try {
                            response = JSON.parse(params);
                        }
                        catch (ex) {
                            response = params;
                        }
                        CallbacksManager.Trigger("WingsNewMessage", response);
                        break;
                    }
                case "AsyncResponse":
                    {
                        try {
                            response = JSON.parse(params);
                        }
                        catch (ex) {
                            response = params;
                        }
                        CallbacksManager.Trigger("WingsNewMessage", response);
                        break;
                    }
                case "Inactivity":
                    {
                        CallbacksManager.Trigger("Inactivity");
                        break;
                    }
            }
        }
    }
    MBirdSdk.Core = Core;
    class Board extends Base {
        static ShowNotification(title, message, notificationType, switchToAppIdentifier, fullNotification) {
            return new Promise((resolve, reject) => {
                var notificationTypeValue = "message";
                if (notificationType === NotificationType.HtmlContent)
                    notificationTypeValue = "htmlcontent";
                if (notificationType === NotificationType.HtmlFile)
                    notificationTypeValue = "htmlfile";
                var obj = {
                    title: title,
                    message: message,
                    switchToAppIdentifier: switchToAppIdentifier,
                    notificationType: notificationTypeValue,
                    fullNotification: fullNotification
                };
                Base.executeString("ShowNotification", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
    }
    MBirdSdk.Board = Board;
    class App extends Base {
        static GetDetails() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetAppDetails").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static GetToken() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetToken").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static WriteLog(message, isError) {
            return new Promise((resolve, reject) => {
                if (message == null || message.length === 0) {
                    reject("Log message is empty!");
                    return;
                }
                var obj = {
                    message: message,
                    isError: isError
                };
                Base.executeString("WriteLog", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static OnInactivity(callback) {
            CallbacksManager.On("Inactivity", callback);
        }
    }
    MBirdSdk.App = App;
    class IOBoard extends Base {
        static ExecuteCommand(commandType, params) {
            return new Promise((resolve, reject) => {
                if (commandType == null) {
                    reject("Command type cannot be null!");
                    return;
                }
                var obj = {
                    commandType: commandType,
                    params: params
                };
                this.executeString("ExecuteIOBoardCommand", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.IOBoard = IOBoard;
    class Scanner extends Base {
        static Scan(value) {
            return new Promise((resolve, reject) => {
                if (value == null) {
                    reject("Timeout seconds is invalid");
                    return;
                }
                Base.executeNumber("Scan", value).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.Scanner = Scanner;
    class Nfc extends Base {
        static Read(value) {
            return new Promise((resolve, reject) => {
                if (value == null) {
                    reject("Timeout seconds is invalid");
                    return;
                }
                Base.executeNumber("NfcRead", value).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.Nfc = Nfc;
    class Camera extends Base {
        static Snapshot() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("CameraSnapshot").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.Camera = Camera;
    class Printer extends Base {
        static TagContent(value) {
            return new Promise((resolve, reject) => {
                if (value == null) {
                    reject("Print text cannot be empty");
                    return;
                }
                Base.executeString("PrintTagContent", value).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
    }
    MBirdSdk.Printer = Printer;
    class Peripherals extends Base {
        static Status() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetPeripheralsStatus").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Details() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetPeripheralDetails").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static StatusDetails() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetPeripheralsStatusDetails").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.Peripherals = Peripherals;
    class Payment extends Base {
        static Pay(amount, transactionReference, name = "") {
            return new Promise((resolve, reject) => {
                var obj = {
                    Amount: amount.toString(),
                    TransactionReference: transactionReference
                };
                if (name.trim() == "") {
                    // need to keep this for backward compatibility
                    Base.executeString("Pay", JSON.stringify(obj)).then((response) => {
                        if (response.Error) {
                            reject(response.Error);
                            return;
                        }
                        resolve(response.Result);
                    });
                }
                else {
                    // prepare object for payment with name
                    var objWithName = {
                        PayRequest: obj,
                        PaymentName: name
                    };
                    Base.executeString("PayWithName", JSON.stringify(objWithName)).then((response) => {
                        if (response.Error) {
                            reject(response.Error);
                            return;
                        }
                        resolve(response.Result);
                    });
                }
            });
        }
        static ElectronicPay(amount, transactionReference, name = "") {
            return new Promise((resolve, reject) => {
                // prepare object for payment
                var obj = {
                    PayRequest: {
                        Amount: amount.toString(),
                        TransactionReference: transactionReference
                    },
                    PaymentName: name
                };
                Base.executeString("ElectronicPay", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static GetAcceptedCurrencies(name = "") {
            return new Promise((resolve, reject) => {
                // prepare object for payment
                var obj = {
                    PaymentName: name
                };
                Base.executeString("GetAcceptedCurrencies", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static StartAcceptMoney(name = "") {
            return new Promise((resolve, reject) => {
                // prepare object for payment
                var obj = {
                    PaymentName: name
                };
                Base.executeString("StartAcceptMoney", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static EndAcceptMoney(amountToBeKept, name = "") {
            return new Promise((resolve, reject) => {
                // prepare object for payment
                var obj = {
                    PayRequest: {
                        Amount: amountToBeKept.toString()
                    },
                    PaymentName: name
                };
                Base.executeString("EndAcceptMoney", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static OnProgress(callback) {
            CallbacksManager.On("PayProgress", callback);
        }
    }
    MBirdSdk.Payment = Payment;
    class Trace extends Base {
        static Transaction(transactionWasSuccessful, transactionReference) {
            return new Promise((resolve, reject) => {
                if (transactionWasSuccessful == null) {
                    reject("You must specify if transaction was successful or not");
                    return;
                }
                var transaction = {
                    TransactionWasSuccessful: transactionWasSuccessful,
                    TransactionReference: transactionReference
                };
                Base.executeString("TraceTransaction", JSON.stringify(transaction)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static Event(event) {
            return new Promise((resolve, reject) => {
                if (event == null) {
                    reject("Trace event content is empty");
                    return;
                }
                Base.executeString("TraceEvent", JSON.stringify(event)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static Status(status) {
            return new Promise((resolve, reject) => {
                if (status == null) {
                    reject("Status object must not be null");
                    return;
                }
                Base.executeString("TraceStatus", JSON.stringify(status)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
    }
    MBirdSdk.Trace = Trace;
    class BundleSettings extends Base {
        static Kiosk() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetKioskSettings").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Store() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetStoreSettings").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static App() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetBundleSettingsLive").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static OnAppSettingsChanged(callback) {
            CallbacksManager.On("BundlesettingsChanged", callback);
        }
    }
    MBirdSdk.BundleSettings = BundleSettings;
    class Sharing extends Base {
        static Register(name) {
            return new Promise((resolve, reject) => {
                if (name == null || name.length === 0) {
                    reject("Name cannot be null or empty");
                    return;
                }
                Base.executeString("Register", name).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static Discover(friendApps) {
            return new Promise((resolve, reject) => {
                if (friendApps == null || friendApps.length === 0) {
                    reject("Friend apps cannot be empty!");
                    return;
                }
                Base.executeString("Discover", JSON.stringify(friendApps)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Message(destination, message, waitForAnswer) {
            return new Promise((resolve, reject) => {
                var obj = {
                    Destination: destination,
                    Message: message,
                    WaitForAnswer: waitForAnswer
                };
                Base.executeString("Message", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static OnNewMessage(callback) {
            CallbacksManager.On("NewMessage", callback);
        }
    }
    MBirdSdk.Sharing = Sharing;
    class Wings extends Base {
        static Status() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("WingsStatus").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Subscribe(name) {
            return new Promise((resolve, reject) => {
                if (name == null || name.length === 0) {
                    reject("Topic name cannot be empty");
                    return;
                }
                Base.executeString("Subscribe", name).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static Unsubscribe(name) {
            return new Promise((resolve, reject) => {
                if (name == null || name.length === 0) {
                    reject("Topic name cannot be null or empty!");
                    return;
                }
                Base.executeString("Unsubscribe", name).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static Publish(message, topic, id) {
            return new Promise((resolve, reject) => {
                if (topic == null || topic.length === 0) {
                    reject("Topic name cannot be null or empty!");
                    return;
                }
                var obj = {
                    Topic: topic,
                    Message: message,
                    Id: id
                };
                Base.executeString("Publish", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static OnNewMessage(callback) {
            CallbacksManager.On("WingsNewMessage", callback);
        }
    }
    MBirdSdk.Wings = Wings;
    class Environment extends Base {
        static About() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetEnvironmentAbout").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static GeoLocation() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetEnvironmentGeoLocation").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.Environment = Environment;
    class CallbacksManager {
        static On(message, callback) {
            var msg = this.callbacks[message] || (this.callbacks[message] = new Callback(message));
            return msg.subscribe(callback);
        }
        static Off(callback, token) {
            if (this.callbacks[callback]) {
                (this.callbacks[callback]).unSubscribe(token);
            }
        }
        static Trigger(callback, payload) {
            if (this.callbacks[callback]) {
                (this.callbacks[callback]).notify(payload);
            }
        }
    }
    CallbacksManager.callbacks = {};
    class Subscription {
        constructor(id, callback) {
            this.id = id;
            this.callback = callback;
        }
    }
    class SharedFriendApp {
        constructor(AppIdentifier, Context) {
            this.AppIdentifier = AppIdentifier;
            this.Context = Context;
        }
    }
    MBirdSdk.SharedFriendApp = SharedFriendApp;
    class FoundFriendApp {
        constructor(AppIdentifier, Context, EntityIp) {
            this.AppIdentifier = AppIdentifier;
            this.Context = Context;
            this.EntityIp = EntityIp;
        }
    }
    MBirdSdk.FoundFriendApp = FoundFriendApp;
    class Callback {
        constructor(callback) {
            this.callback = callback;
            this.subscriptions = [];
            this.nextId = 0;
        }
        subscribe(callback) {
            var subscription = new Subscription(this.nextId++, callback);
            this.subscriptions[subscription.id] = subscription;
            return subscription.id;
        }
        unSubscribe(id) {
            this.subscriptions[id] = undefined;
        }
        notify(payload) {
            for (var index = 0; index < this.subscriptions.length; index++) {
                if (this.subscriptions[index]) {
                    this.subscriptions[index].callback(payload);
                }
            }
        }
    }
    var NotificationType;
    (function (NotificationType) {
        NotificationType[NotificationType["Message"] = 0] = "Message";
        NotificationType[NotificationType["HtmlFile"] = 1] = "HtmlFile";
        NotificationType[NotificationType["HtmlContent"] = 2] = "HtmlContent";
    })(NotificationType = MBirdSdk.NotificationType || (MBirdSdk.NotificationType = {}));
    var IOBoardCommandType;
    (function (IOBoardCommandType) {
        IOBoardCommandType[IOBoardCommandType["OpenPrinterDoor"] = 0] = "OpenPrinterDoor";
        IOBoardCommandType[IOBoardCommandType["OpenMaintenanceDoor"] = 1] = "OpenMaintenanceDoor";
        IOBoardCommandType[IOBoardCommandType["OpenAdditionalDoor"] = 2] = "OpenAdditionalDoor";
        IOBoardCommandType[IOBoardCommandType["SetSemaphoreOK"] = 3] = "SetSemaphoreOK";
        IOBoardCommandType[IOBoardCommandType["SetSemaphoreNOK"] = 4] = "SetSemaphoreNOK";
        IOBoardCommandType[IOBoardCommandType["OpenBarrier"] = 5] = "OpenBarrier";
        IOBoardCommandType[IOBoardCommandType["SetCustomerJourneyPaymentON"] = 6] = "SetCustomerJourneyPaymentON";
        IOBoardCommandType[IOBoardCommandType["SetCustomerJourneyPaymentOFF"] = 7] = "SetCustomerJourneyPaymentOFF";
        IOBoardCommandType[IOBoardCommandType["SetCustomerJourneyPrinterON"] = 8] = "SetCustomerJourneyPrinterON";
        IOBoardCommandType[IOBoardCommandType["SetCustomerJourneyPrinterOFF"] = 9] = "SetCustomerJourneyPrinterOFF";
        IOBoardCommandType[IOBoardCommandType["SetCustomerJourneyScannerON"] = 10] = "SetCustomerJourneyScannerON";
        IOBoardCommandType[IOBoardCommandType["SetCustomerJourneyScannerOFF"] = 11] = "SetCustomerJourneyScannerOFF";
    })(IOBoardCommandType = MBirdSdk.IOBoardCommandType || (MBirdSdk.IOBoardCommandType = {}));
    var UIAlignment;
    (function (UIAlignment) {
        UIAlignment[UIAlignment["TopLeft"] = 0] = "TopLeft";
        UIAlignment[UIAlignment["TopCenter"] = 1] = "TopCenter";
        UIAlignment[UIAlignment["TopRight"] = 2] = "TopRight";
        UIAlignment[UIAlignment["MiddleLeft"] = 3] = "MiddleLeft";
        UIAlignment[UIAlignment["MiddleCenter"] = 4] = "MiddleCenter";
        UIAlignment[UIAlignment["MiddleRight"] = 5] = "MiddleRight";
        UIAlignment[UIAlignment["BottomLeft"] = 6] = "BottomLeft";
        UIAlignment[UIAlignment["BottomCenter"] = 7] = "BottomCenter";
        UIAlignment[UIAlignment["BottomRight"] = 8] = "BottomRight";
        UIAlignment[UIAlignment["Hide"] = 9] = "Hide";
    })(UIAlignment = MBirdSdk.UIAlignment || (MBirdSdk.UIAlignment = {}));
})(MBirdSdk || (MBirdSdk = {}));
