# Dotnet core webapp with static files
## Setup

    dotnet new console -o dotnet-static-web

## Code
### Program.cs

Create and initialize a web host with passed arguments. 

    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });

Plumb it with the arguments in the Main function.

    CreateHostBuilder(args).Build().Run();

### Startup.cs

Use a list of default files for loading. 

    app.UseDefaultFiles();

Serve files with the static file provider.

    app.UseStaticFiles();

## Run

    dotnet run

> Navigate to https://localhost:5000/