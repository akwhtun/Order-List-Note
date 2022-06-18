<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Lists</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
<body>
    <div class="container">
        <h2>Orders Lists</h2>
        <ul id="orderlists">
            
        </ul>

        <!-- Add Order Lists Form -->
        <div class="input-group">

            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>

            <label for="order">Order</label>
            <input type="text" id="order" name="order" required>

            <label for="quantity">Quantity</label>
            <input type="text" id="quantity" name="quantity">

            <label for="address">Address</label>
            <input type="text" id="address" name="address" required>

            <button id="addBtn">Add</button>

        </div>
    </div>
    <script src="./jQuery/jquery.js"></script>
    <script src="./app.js"></script>
</body>
</html>