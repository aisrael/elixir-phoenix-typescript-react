defmodule Hello.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Hello.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: Hello.PubSub}
      # Start a worker by calling: Hello.Worker.start_link(arg)
      # {Hello.Worker, arg}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: Hello.Supervisor)
  end
end
