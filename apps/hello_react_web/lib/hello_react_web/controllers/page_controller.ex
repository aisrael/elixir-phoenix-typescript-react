defmodule HelloReactWeb.PageController do
  use HelloReactWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
