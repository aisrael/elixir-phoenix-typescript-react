defmodule WaitlistWeb.PageController do
  use WaitlistWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
