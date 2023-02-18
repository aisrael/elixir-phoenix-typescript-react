defmodule Waitlist.Repo do
  use Ecto.Repo,
    otp_app: :waitlist,
    adapter: Ecto.Adapters.Postgres
end
