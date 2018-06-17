const onExit = require('signal-exit');

/**
 * Если завершение произошло из-за непойманной ошибки или `process.exit(code)`
 * то `code` будет равен `1` или тому, что передали в `process.exit(code)`, а `signal` = `null`.
 *
 * Если завершение произошло из-за явной остановки (например, Ctrl+C в консоли или process.kill(pid, sig)),
 * то `code` = `null`, а `signal` - соответствующему сигналу, переданному в процесс (например, `SIGINT` или `SIGTERM`).
 */
onExit((code, signal) => process.emit('cleanup', { code, signal }));
