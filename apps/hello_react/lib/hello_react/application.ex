defmodule HelloReact.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      HelloReact.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: HelloReact.PubSub}
      # Start a worker by calling: HelloReact.Worker.start_link(arg)
      # {HelloReact.Worker, arg}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: HelloReact.Supervisor)
  end
end
