"""create category table

Revision ID: b8e926d239f9
Revises: e0919a39645f
Create Date: 2021-03-18 20:28:24.894968

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "b8e926d239f9"
down_revision = "e0919a39645f"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "category",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("uuid", sa.String(255), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("name", sa.String(255), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    with op.batch_alter_table("plan") as batch_op:
        batch_op.add_column(sa.Column("category_uuid", sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            "fk_category_uuid", "category", ["category_uuid"], ["uuid"]
        )


def downgrade():
    pass
