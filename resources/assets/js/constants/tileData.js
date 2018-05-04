export const otherMailFolderListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <MailIcon/>
            </ListItemIcon>
            <ListItemText primary='All mail'/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DeleteIcon/>
            </ListItemIcon>
            <ListItemText primary='Trash'/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ReportIcon/>
            </ListItemIcon>
            <ListItemText primary='Spam'/>
        </ListItem>
    </div>
)
