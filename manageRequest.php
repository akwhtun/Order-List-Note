<?php

$db = new PDO('mysql:dbhost=localhsot;dbname=list', 'root', '', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
]);

$getRequest = $_REQUEST['makeRequest'];

switch ($getRequest) {
    case 'get':
       getAllLists();
        break;
    case 'add':
        addList();
        break;
    case 'update':
        updateList();
        break;
    case 'delete':
        deleteList();
        break;
    case 'done':
        doneList();
        break;
    case 'undone':
        undoneList();
        break;
    default:
        unknownList();
        break;
}

function getAllLists() {
    global $db;
    $allLists = $db->query("SELECT * FROM order_lists");
    $result = $allLists->fetchAll();
    if($result){
        print_r(json_encode($result));
    }else {
        print_r(array('msg' => 'cannot get lists'));
    }
};

function addList() {
    global $db;
    $name = $_POST['name'];
    $order_name = $_POST['order_name'];
    $address = $_POST['address'];
    $quantity = $_POST['quantity'];

    $add = "INSERT INTO order_lists (name, order_name, quantity, address, created_at) VALUES (:name, :order_name, :quantity, :address, NOW())";
    $addList = $db->prepare($add);
    $addList->execute([
        ':name' => $name,
        ':order_name'=> $order_name,
        ':address' => $address,
        ':quantity' => $quantity
    ]);
    $addResult = $db->lastInsertId();
    if($addResult) {
        print_r($addResult);
    }else {
        print_r(array('msg' => 'cannot add list'));
    }
};

function updateList() {
    global $db;
    $id = $_POST['id'];
    $upName = $_POST['upName'];
    $upOrder = $_POST['upOrder'];
    $upQuantity = $_POST['upQuantity'];
    $upAddress = $_POST['upAddress'];
    $update = "UPDATE order_lists SET name=:name, order_name =:order_name, quantity=:quantity, address=:address, updated_at=NOW() WHERE id=$id";
    $updateList = $db->prepare($update);
    $updateList->execute([
        ':name' => $upName,
        ':order_name' => $upOrder,
        ':quantity' => $upQuantity,
        ':address' => $upAddress
    ]);
    $updatResult = $updateList->rowCount();;
    if($updatResult) {
        print_r($updatResult);
    }else {
        print_r(array('msg' => 'cannot update list'));
    }
};

function deleteList() {
    global $db;
    $id = $_POST['id'];

    $delete = "DELETE FROM order_lists WHERE id=$id";
    $deleteList = $db->prepare($delete);
    $deleteList->execute();
    $deleteResult = $deleteList->rowCount();
    if($deleteResult) {
        print_r($deleteResult);
    }else {
        print_r(array('msg' => 'cannot delete list'));
    }
};

function doneList() {
    global $db;
    $id = $_POST['id'];
    $done = "UPDATE order_lists SET done=1, done_at=NOW() WHERE id=$id";
    $doneList = $db->prepare($done);
    $doneList->execute();
    $doneResult = $doneList->rowCount();
    if($doneResult) {
        print_r($doneResult);
    }else {
        print_r(array('msg' => 'cannot done list'));
    }
}

function undoneList() {
    global $db;
    $id = $_POST['id'];
    $undone = "UPDATE order_lists SET done=0 WHERE id=$id";
    $undoneList = $db->prepare($undone);
    $undoneList->execute();
    $undoneResult = $undoneList->rowCount();
    if($undoneResult) {
        print_r($undoneResult);
    }else {
        print_r(array('msg' => 'cannot undone list'));
    }
}

function unknownList() {
 print_r(array('msg' => 'unknown request'));
}

   
