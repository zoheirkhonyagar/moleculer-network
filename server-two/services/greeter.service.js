'use strict';

module.exports = {
  name: 'greeter',

  /**
   * Service settings
   */
  settings: {},

  /**
   * Service dependencies
   */
  dependencies: [],

  /**
   * Actions
   */
  actions: {
    /**
     * Say a 'Hello'
     *
     * @returns
     */
    hello(ctx) {
      return ctx.call('say.welcome', { name: 'zoheir' });
    },

    /**
     * Welcome a username
     *
     * @param {String} name - User name
     */
    welcome: {
      params: {
        name: 'string'
      },
      handler(ctx) {
        return `Welcome, ${ctx.params.name}`;
      }
    }
  },

  /**
   * Events
   */
  events: {
    'echo.event'(data, sender) {
      this.logger.info(
        `<< MATH: Echo event received from ${sender}. Counter: ${data.counter}. Send reply...`
      );
      this.broker.emit('reply.event', data);
    }
  },

  /**
   * Methods
   */
  methods: {},

  /**
   * Service created lifecycle event handler
   */
  created() {},

  /**
   * Service started lifecycle event handler
   */
  started() {},

  /**
   * Service stopped lifecycle event handler
   */
  stopped() {}
};
