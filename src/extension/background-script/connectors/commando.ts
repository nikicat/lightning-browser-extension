import LnMessage from "lnmessage";

import Connector, {
  CheckPaymentArgs,
  CheckPaymentResponse,
  GetBalanceResponse,
  GetInfoResponse,
  GetInvoicesResponse,
  KeysendArgs,
  MakeInvoiceArgs,
  MakeInvoiceResponse,
  SendPaymentArgs,
  SendPaymentResponse,
  SignMessageArgs,
  SignMessageResponse,
} from "./connector.interface";

interface Config {
  host: string;
  port: number;
  rune: string;
  pubkey: string;
  wsProxy: string;
  privateKey: string;
}

export type CommandoResponse = {
  alias: string;
  id: string;
  color: string;
};
export default class Commando implements Connector {
  config: Config;
  ln: LnMessage;

  constructor(config: Config) {
    this.config = config;
    this.ln = new LnMessage({
      remoteNodePublicKey: this.config.pubkey,
      wsProxy: this.config.wsProxy || "wss://proxy.lnlink.org",
      ip: this.config.host,
      port: this.config.port || 9735,
      privateKey:
        this.config.privateKey ||
        "d6a2eba36168cc31e97396a781a4dd46dd3648c001d3f4fde221d256e41715ea",
    });
  }

  async init() {
    // initiate the connection to the remote node
    await this.ln.connect();
  }

  unload() {
    return Promise.resolve();
  }

  // not yet implemented
  connectPeer() {
    console.error(
      `${this.constructor.name} does not implement the getInvoices call`
    );
    return new Error("Not yet supported with the currently used account.");
  }

  async getInvoices(): Promise<GetInvoicesResponse> {
    throw new Error("Not yet supported with the currently used account.");
  }

  async getInfo(): Promise<GetInfoResponse> {
    const response = (await this.ln.commando({
      method: "getinfo",
      params: [],
      rune: this.config.rune,
    })) as CommandoResponse;
    return {
      data: {
        alias: response.alias,
        pubkey: response.id,
        color: response.color,
      },
    };
  }

  async getBalance(): Promise<GetBalanceResponse> {
    return {
      data: {
        balance: 0,
      },
    };
  }

  async sendPayment(args: SendPaymentArgs): Promise<SendPaymentResponse> {
    throw new Error("Not yet supported with the currently used account.");
  }

  async keysend(args: KeysendArgs): Promise<SendPaymentResponse> {
    throw new Error("Not yet supported with the currently used account.");
  }

  async checkPayment(args: CheckPaymentArgs): Promise<CheckPaymentResponse> {
    throw new Error("Not yet supported with the currently used account.");
  }

  signMessage(args: SignMessageArgs): Promise<SignMessageResponse> {
    throw new Error("Not yet supported with the currently used account.");
  }

  async makeInvoice(args: MakeInvoiceArgs): Promise<MakeInvoiceResponse> {
    throw new Error("Not yet supported with the currently used account.");
  }
}