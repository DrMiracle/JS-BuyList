$(function(){

    var LIST = $('.bl-list');
    var NOTBOUGHTLIST = $('.bl-not-bought');
    var BOUGHTPRODUCTSLIST = $('.bl-bought-products-box');
    var ITEM_TEMPLATE = $('.bl-row')[0].outerHTML;
    var NOTBOUGHTITEM_TEMPLATE = $('.bl-not-bought-products-box')[0].outerHTML;

    function updateNode(node, fn){
        node.fadeOut(250, function(){
            fn();
            node.fadeIn(250);
        });
    }

    function editTitle (node, notboughtnode){
        node.find('.bl-productnamebox').click(function (){
            if ($(this).hasClass("edit-mode") || node.hasClass("bl-row-bought"))
                return;
            var title = node.find(".bl-productname").text().trim();
            var box = $(this);
            node.find(".bl-productname-input").val(title);
            box.addClass("edit-mode");
            node.find(".bl-productname-input").focus();
            node.find(".bl-productname-input").on("input", function (){
                var newName = $(this).val();
                node.find(".bl-productname").text(newName);
                notboughtnode.find(".bl-product-name").text(newName);
            })
            node.find(".bl-productname-input").blur(function (){
                box.removeClass("edit-mode");
            })
        })
    }

    function quantityChanges (node, notboughtnode){
        node.find('.bl-dotminus').click(function (){
                if (!node.find('.bl-dotminus').hasClass("inactive")) {
                    updateNode(node.find(".bl-quantity"), function () {
                    var quantity = parseInt(node.find(".bl-productnumber").text());
                    quantity--;
                    node.find(".bl-productnumber").text(quantity);
                    notboughtnode.find(".bl-product-quantity").text(quantity);
                    if (quantity === 1) {
                        node.find('.bl-dotminus').addClass("inactive");
                    }
                })
            }
        });
        node.find('.bl-dotplus').click(function (){
            updateNode(node.find(".bl-quantity"), function () {
                var quantity = parseInt(node.find(".bl-productnumber").text());
                quantity++;
                node.find(".bl-productnumber").text(quantity);
                notboughtnode.find(".bl-product-quantity").text(quantity);
                if (quantity === 2){
                    node.find('.bl-dotminus').removeClass("inactive");
                }
            })
        });
    }

    function markAsBought (node, notboughtnode){
        node.find(".bl-buy").click(function() {
            updateNode(node.find(".bl-productcontainer"), function (){
                if (!node.hasClass("bl-row-bought")){
                    node.addClass("bl-row-bought");
                    node.find('.bl-buy').text("Не куплено");
                    BOUGHTPRODUCTSLIST.append(notboughtnode);
                } else {
                    node.removeClass("bl-row-bought");
                    node.find('.bl-buy').text("Куплено");
                    NOTBOUGHTLIST.append(notboughtnode);
                }
            })
        })
    }

    function deleteHandler (node, notboughtnode){
        node.find(".bl-delete").click(function(){
            node.remove();
            notboughtnode.remove();
        })
    }

    // Add delete for already existing rows
    $('.bl-row').each(function (){
        var node = $(this);
        var title = node.find(".bl-productname").text().trim();
        var quantity = parseInt(node.find(".bl-productnumber").text());
        $('.bl-not-bought-products-box').each(function (){
            var notboughtnode = $(this);
            var nbTitle = notboughtnode.find(".bl-product-name").text().trim();
            var nbQuantity = parseInt(notboughtnode.find(".bl-product-quantity").text());
            if(nbTitle === title && nbQuantity === quantity){
                editTitle (node, notboughtnode);
                quantityChanges (node, notboughtnode);
                markAsBought (node, notboughtnode);
                deleteHandler(node, notboughtnode);
            }
        })
    });

    function addItem(title)	{
        var node = $(ITEM_TEMPLATE); //Create	new	HTML	node
        var notboughtnode = $(NOTBOUGHTITEM_TEMPLATE);
        node.find(".bl-productname").text(title);	//Set	product	title
        // Change the name of the product
        editTitle (node, notboughtnode);
        // Change quantity of product
        quantityChanges (node, notboughtnode);
        // Mark as bought
        markAsBought (node, notboughtnode)
        //Delete	Action
        deleteHandler(node, notboughtnode);
        notboughtnode.find(".bl-product-name").text(title);
        LIST.append(node);	//Add	to	the	end	of	the	list
        NOTBOUGHTLIST.append(notboughtnode);
    }

    $('.bl-button-add').click(function () {
        var title = $('.bl-type').val().trim();
        if (title !== ""){
            addItem(title);
            $('.bl-type').val("")
        }
    });


});
