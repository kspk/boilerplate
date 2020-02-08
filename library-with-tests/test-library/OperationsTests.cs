using System;
using Xunit;

using Library;

namespace TestLibrary
{
    public class OperationsTests
    {
        [Fact]
        public void TestAdd()
        {
            Assert.Equal(42, new Operations().Add(19, 23));
        }
    }
}
