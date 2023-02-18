defmodule Waitlist.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Waitlist.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: Waitlist.PubSub}
      # Start a worker by calling: Waitlist.Worker.start_link(arg)
      # {Waitlist.Worker, arg}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: Waitlist.Supervisor)
  end
end
