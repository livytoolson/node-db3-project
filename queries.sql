-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT
    p.productname,
    c.categoryname
FROM product p
JOIN category c
    ON p.categoryid = c.id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT 
    o.Id, 
    s.CompanyName, 
    o.OrderDate
from [Order] o
join Shipper s
    on o.ShipVia = s.Id 
where o.OrderDate < '2012-08-09'
order by OrderDate;

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT
    p.productname,
    o.quantity
FROM orderdetail o
JOIN product p
    ON o.productid = p.id
WHERE o.OrderId = 10251
ORDER BY p.productname desc;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT
    [Order].Id OrderID,
    c.CompanyName,
    e.LastName EmployeeLastName
FROM [Order]
JOIN Customer c
    on [Order].CustomerId = c.Id
JOIN Employee e 
    on  [Order].EmployeeId = e.Id;
