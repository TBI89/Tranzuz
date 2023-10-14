import path from "path";
import fs from "fs";

// Absolute path to save errors and activities:
const errorLogs = path.resolve(__dirname, "../1-assets/logs/errors.log");
const activityLogs = path.resolve(__dirname, "../1-assets/logs/activities.log");

// Error message template:
function logError(message: string, err?: any): void {
    const now = new Date();
    let messageToLog = now.toLocaleTimeString() + "\n";
    messageToLog += message + "\n";
    if (typeof err === "string") messageToLog += err + "\n";
    if (err?.stack) messageToLog += `Stack: ${err.stack}\n`;
    messageToLog += "-----------------------------------------";
    fs.appendFile(errorLogs, messageToLog, () => { });
}

// Activity message template:
function logActivity(message: string): void {
    const now = new Date();
    let messageToLog = now.toLocaleTimeString() + "\n";
    messageToLog += message + "\n";
    messageToLog += "-----------------------------------------";
    fs.appendFile(activityLogs, messageToLog, () => { });
}

export default {
    logError,
    logActivity
};