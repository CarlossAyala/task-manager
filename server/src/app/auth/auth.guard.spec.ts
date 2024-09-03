import { JWTGuard } from "./guards/jwt.guard";

describe("AuthGuard", () => {
  it("should be defined", () => {
    expect(new JWTGuard()).toBeDefined();
  });
});
