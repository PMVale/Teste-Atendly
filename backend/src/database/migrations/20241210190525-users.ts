'use strict';

import { DataTypes as DataTypesType, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  up (queryInterface: QueryInterface, Sequelize: typeof DataTypesType) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    })
  },

  down (queryInterface: QueryInterface, Sequelize: typeof DataTypesType) {
    return queryInterface.dropTable('users');
  }
};
