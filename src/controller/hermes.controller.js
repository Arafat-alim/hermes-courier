const handleGetLiveServer = (req, res) => {
  const baseUrl = process.env.BASE_URL;
  const port = process.env.PORT;
  try {
    return res.status(200).json({
      success: true,
      message: `Server is running at ${baseUrl}:${port}/me`,
    });
  } catch (err) {
    console.error("Failed to get the live server", err);
  }
};

module.exports = {
  handleGetLiveServer,
};
