/* tslint:disable */
/* eslint-disable */

/**
 * Informações de cadastro
 */
export interface CredencialRegisterDto {

  /**
   * Email do Usário
   */
  email?: string;

  /**
   * Login do Usuário
   */
  login?: string;

  /**
   * Nome do Usuário
   */
  nome?: string;

  /**
   * Senha do usuário
   */
  senha?: string;

  /**
   * Indica se o usuário está ativo
   */
  statusAtivo?: boolean;
}
