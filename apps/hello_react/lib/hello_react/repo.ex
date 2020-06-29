defmodule HelloReact.Repo do
  use Ecto.Repo,
    otp_app: :hello_react,
    adapter: Ecto.Adapters.Postgres
end
