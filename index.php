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
    <div class="container">
        <h2>Orders Lists</h2>
        <ul id="orderlists">

        </ul>
        <!-- Add Order Lists Form -->
        <form class="input-group">
            <fieldset>
                <legend>Add Order</legend>
                <div class="ig ig1">
                    <label for="name">Name : </label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="ig ig2">
                    <label for="order">Order : </label>
                    <input type="text" id="order" name="order" required>
                </div>
                <div class="ig ig3">
                    <label for="quantity">Quantity : </label>
                    <input type="number" min="1" max="100" value="1" id="quantity" name="quantity">
                </div>
                <div class="ig ig4">
                    <label for="address">Address : </label>
                    <textarea name="address" id="address" cols="30" rows="2" required></textarea>
                </div>
                <button id="addBtn">ADD</button>
            </fieldset>
        </form>
    </div>
    <script src="./jQuery/jquery.js"></script>
    <script src="./app.js"></script>
</body>
</html>