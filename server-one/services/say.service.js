'use strict';

module.exports = {
  name: 'say',

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
    hello() {
      return 'Hello Moleculer';
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
        console.log(`Welcome, ${ctx.params.name}`);
        return `Welcome, ${ctx.params.name} from server 1`;
      }
    }
  },

  /**
   * Events
   */
  events: {},

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
  started() {
    this.counter = 1;

    setInterval(() => {
      this.broker.logger.info(`>> Send echo event. Counter: ${this.counter}.`);
      this.broker.emit('echo.event', { counter: this.counter++ });
    }, 5000);
  },

  /**
   * Service stopped lifecycle event handler
   */
  stopped() {}
};
