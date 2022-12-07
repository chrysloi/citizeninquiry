import logger from 'pino';
import dayjs from 'dayjs';
const log = logger({
  base: {
    pid: true,
  },
  timestamp: () => `,time ":" ${dayjs().format()}"`,
});
export default log;
