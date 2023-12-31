import express from "express";
import { ProductRouter } from "./routes";
import { Connection } from "./connection";

export class App {
  private app = express();
  private productRouter: ProductRouter;
  private connection: Connection;
  private port = process.env.PORT || "3000";

  constructor({ ProductModel }: any) {
    this.productRouter = new ProductRouter(ProductModel);
    this.connection = new Connection();
    this.appConnect();
    this.appMiddlewares();
    this.appRoutes();
    this.appListen();
  }

  appRoutes() {
    this.app.use("/api/products", this.productRouter.getRouter());
  }

  appListen() {
    this.app.listen(this.port, () =>
      console.log(`Server running on port http://localhost:${this.port}`)
    );
  }

  appMiddlewares() {
    this.app.use(express.json());
  }

  async appConnect() {
    await this.connection.testConnection();
  }
}
