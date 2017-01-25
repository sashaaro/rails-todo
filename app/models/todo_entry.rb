class TodoEntry < ApplicationRecord
  belongs_to :project, class_name: "Project"
  validates :text, {presence: true, length: {minimum: 2}}
end
