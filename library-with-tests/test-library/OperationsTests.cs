using System;
using Xunit;

using Library;

namespace TestLibrary
{
    public class OperationsTests
    {
        [Fact]
        public void TestAddEquals()
        {
            Assert.Equal(42, new Operations().Add(19, 23));
        }

        [Fact]
        public void TestAddNotEquals()
        {
            Assert.NotEqual(42, new Operations().Add(19, 20));
        }
    }
}
