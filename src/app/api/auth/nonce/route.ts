export async function POST(req: Request) {
  try {
    const requestId = req.headers.get("x-request-id");
    const nonce = nanoid(24);
    const createdAt = Date.now();

    await storeAuthNonce({ nonce, createdAt });

    const env = getEnvServer();
    const chainId = env.X402_NETWORK;

    return NextResponse.json({
      nonce,
      issuedAt: new Date(createdAt).toISOString(),
      chainId,
      requestId,
    });

  } catch (error) {
    console.error("Nonce route error:", error);
    return NextResponse.json(
      { error: "Failed to generate nonce" },
      { status: 500 }
    );
  }
}