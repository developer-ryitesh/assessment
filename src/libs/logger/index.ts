import chalk from "chalk";

const COLORS = {
   primary: chalk.hex("#0d6efd"),
   secondary: chalk.hex("#6c757d"),
   success: chalk.hex("#198754"),
   danger: chalk.hex("#dc3545"),
   warning: chalk.hex("#ffc107"),
   info: chalk.hex("#0dcaf0"),
   light: chalk.hex("#f8f9fa"),
   dark: chalk.hex("#212529"),
   debug: chalk.hex("#7833F6"),
   redux: chalk.hex("#3F9BB8"),
};

const timestamp = () => chalk.gray(`LOGGER : [${new Date().toLocaleTimeString()}]`);

const formatLabel = (emoji: string, text: string) => {
   const paddedText = text.padEnd(7);
   return `${emoji} ${paddedText}`;
};

const formatMessage = (message: any) => {
   if (Array.isArray(message)) {
      return `\n${JSON.stringify(message, null, 2)}`;
   } else if (typeof message === "object" && message !== null) {
      return `\n${JSON.stringify(message, null, 2)}`;
   }
   return message;
};
const DEVELOPMENT = window.location.hostname.includes("localhost");
export default class Logger {
   static success(message: any) {
      DEVELOPMENT && console.log(`${timestamp()} ${COLORS.success.bold(formatLabel("✔", "SUCCESS"))} : ${formatMessage(message)}`);
   }

   static error(message: any) {
      DEVELOPMENT && console.log(`${timestamp()} ${COLORS.danger.bold(formatLabel("✖", "ERROR"))} : ${formatMessage(message)}`);
   }

   static warning(message: any) {
      DEVELOPMENT && console.log(`${timestamp()} ${COLORS.warning.bold(formatLabel("⚠", "WARNING"))} : ${formatMessage(message)}`);
   }

   static info(message: any) {
      DEVELOPMENT && console.log(`${timestamp()} ${COLORS.info.bold(formatLabel("ℹ", "INFO"))} : ${formatMessage(message)}`);
   }

   static debug(message: any) {
      DEVELOPMENT && console.log(`${timestamp()} ${COLORS.debug.bold(formatLabel("🐛", "DEBUG"))} : ${formatMessage(message)}`);
   }

   static redux(message: any) {
      DEVELOPMENT && console.log(`${timestamp()} ${COLORS.redux.bold(formatLabel("⚛️", "REDUX"))} : ${formatMessage(message)}`);
   }

   // Additional method to log objects/arrays with a title
   static log(title: string, data: any) {
      if (DEVELOPMENT) {
         console.log(`${timestamp()} ${COLORS.primary.bold(formatLabel("🔍", "LOG"))} : ${title}`);
         console.log(formatMessage(data));
      }
   }
}
