import colors from 'colors';
import { Server } from 'socket.io';
import { logger } from '../shared/logger';

const socket = (io: Server) => {
  io.on('connection', socket => {
    logger.info(colors.blue('🔌🟢 A user connected'));
    //disconnect
    socket.on('disconnect', () => {
      logger.info(colors.red('🔌🔴 A user disconnected'));
    });
  });
};

export const socketHelper = { socket };
