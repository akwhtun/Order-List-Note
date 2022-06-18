$(function () {

    var orderul = $('#orderlists');
    
    //get all orderlists

    $.get('/orderlists/manageRequest.php', {makeRequest: 'get'}, function(orderLists) {
        $.each(orderLists, function(index, orderlist) {
            
            listOrder(orderlist, orderlist.id);

        });

    }, 'json');

    function listOrder(order, dataId) {
        var orderli = $('<li>');

            var p1 = $('<p>');
            var p2 = $('<p>');
            var p3 = $('<p>');
            var p4 = $('<p>');

            var sname = $('<strong>').html('Name : ');
            var snameValue = $('<span>').html(order.name);  
            var sorder = $('<strong>').html('Order : ');
            var sorderValue = $('<span>').html(order.order_name);  
            var squantity = $('<strong>').html('Quantity : ');
            var squantityValue = $('<span>').html(order.quantity);  
            var saddress = $('<strong>').html('Address : ');
            var saddressValue = $('<span>').html(order.address);  

            //<p> <strong> </strong> <span> </span> </p>      
            var pa1 = p1.append(sname).append(snameValue); 
            var pa2 = p2.append(sorder).append(sorderValue); 
            var pa3 = p3.append(squantity).append(squantityValue); 
            var pa4 = p4.append(saddress).append(saddressValue); 

            //<li> <p> <strong> </strong> <span> </span> </p> </li>
            var addli = orderli.append(pa1).append(pa2).append(pa3).append(pa4);4

             //<ul> <li> <p> <strong> </strong> <span> </span> </p> </li> </ul>
            orderul.append(addli);
    }
})