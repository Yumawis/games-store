import { ConsoleLogger } from '@nestjs/common';

const ALLOWED_LOG_CONTEXTS: ReadonlySet<string> = new Set([
  'NestFactory',
  'Bootstrap',
]);

export class SelectiveLogger extends ConsoleLogger {
  override log(message: unknown, ...optionalParams: unknown[]): void {
    if (this.isAllowedContext(optionalParams)) {
      const content = this.toPlainString(message);
      process.stdout.write(`${this.formatTimestamp()} ${content}\n`);
    }
  }

  override debug(..._args: unknown[]): void {
    return;
  }

  override verbose(..._args: unknown[]): void {
    return;
  }

  private isAllowedContext(optionalParams: unknown[]): boolean {
    const last = optionalParams[optionalParams.length - 1];
    return typeof last === 'string' && ALLOWED_LOG_CONTEXTS.has(last);
  }

  private toPlainString(message: unknown): string {
    if (Array.isArray(message)) {
      return message.map((item) => this.toPlainString(item)).join('\n');
    }
    return typeof message === 'string' ? message : String(message);
  }

  private formatTimestamp(): string {
    const now = new Date();
    const date = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('-');
    const time = [
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0'),
      String(now.getSeconds()).padStart(2, '0'),
    ].join(':');
    return `[${date}] [${time}]`;
  }
}
