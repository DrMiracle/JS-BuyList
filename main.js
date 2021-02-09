$(function(){

    var LIST	=	$('.list-of-items');
    var ITEM_TEMPLATE	=	$('.one-item').html();
    function	addItem(title)	{
        var node	=	$(ITEM_TEMPLATE);	//Create	new	HTML	node
        node.find(".title").text(title);	//Set	product	title
//Delete	Action
        node.find(".delete-button").click(function(){
            node.remove();
        });
        LIST.append(node);	//Add	to	the	end	of	the	list
    }

});