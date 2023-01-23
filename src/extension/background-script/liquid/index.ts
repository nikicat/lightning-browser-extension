import * as secp256k1 from "@noble/secp256k1";

class Liquid {
  privateKey: string;

  constructor(privateKey: string) {
    this.privateKey = privateKey;
  }

  getPublicKey() {
    const publicKey = secp256k1.schnorr.getPublicKey(
      secp256k1.utils.hexToBytes(this.privateKey)
    );
    const publicKeyHex = secp256k1.utils.bytesToHex(publicKey);
    return publicKeyHex;
  }

  async signSchnorr(sigHash: Buffer): Promise<Buffer> {
    const sig = await secp256k1.schnorr.sign(sigHash, this.privateKey);
    return Buffer.from(sig.buffer);
  }
}

export default Liquid;
