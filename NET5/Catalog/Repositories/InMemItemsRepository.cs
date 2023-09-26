using System;
using System.Collections.Generic;
using Catalog.Entities;

namespace Catalog.Repositories 
{
    public class InMemItemsRepositoty 
    {
        private readonly List<Item> items = new() 
        {
            new Item { Id = Guid.NewGuid(), Name = ""}
        }
    }
}