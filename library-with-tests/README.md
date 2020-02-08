# Dotnet core boilerplate with tests
## Setup

Create the base solution

    dotnet new sln -o library-with-tests
    
    dotnet new classlib -o library
    
    dotnet sln add library/library.csproj 

    dotnet new xunit -o test-library

    dotnet add test-library/test-library.csproj reference library/library.csproj

    
